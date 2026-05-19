<script setup lang="ts">
import { inject, ref } from 'vue'
import { Sexo, type Usuario, StatusAtvFisic, Objetivo } from '../types/usuario'
import type { SelectItem } from '@nuxt/ui'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const defaultAtvFis = ref<StatusAtvFisic>(StatusAtvFisic.sedentario)
const defaultSexoInput = ref<Sexo>(Sexo.masculino)
const defaultObjetivoInput = ref<Objetivo>(Objetivo.perderPeso)

const nivelAtvFisInput = ref<SelectItem[]>([
  { label: 'Sedentário', value: StatusAtvFisic.sedentario },
  { label: 'Baixa Frequência (2-3 dias por semana)', value: StatusAtvFisic.baixaFreq },
  { label: 'Média Frequência (4 dias por semana)', value: StatusAtvFisic.mediaFreq },
  { label: 'Alta Frequência (5-6 dias por semana)', value: StatusAtvFisic.altaFreq }
])

const sexoInput = ref<SelectItem[]>([
  { label: 'Masculino', value: Sexo.masculino, icon: 'material-symbols:man' },
  { label: 'Feminino', value: Sexo.feminino, icon: 'material-symbols:woman' },
])

const objetivoInput = ref<SelectItem[]>([
  { label: 'Perder peso', value: Objetivo.perderPeso },
  { label: 'Manter peso', value: Objetivo.manter },
  { label: 'Ganhar massa muscular', value: Objetivo.ganhoMassa }
])

const idadeInput = ref<number>(18)
const pesoInput = ref<number>(70)
const alturaInput = ref<number>(170)

const imc = ref<number>(pesoInput.value / ((alturaInput.value / 100) ** 2))
const tmb = ref<number>((10 * pesoInput.value) + (6.25 * alturaInput.value) - (5 * idadeInput.value))

let gProteinaPorKg: number = 0
let gCarboPorKg: number = 0
let gGorduraPorKg: number = 0

async function calcular() {
  
  try {

    if (defaultSexoInput.value === sexoInput.value[0]) {
      tmb.value -= 161
    }
    if (defaultSexoInput.value === sexoInput.value[1]) {
      tmb.value += 5
    }
    if (defaultAtvFis.value === nivelAtvFisInput.value[0]) {
        tmb.value *= 1.2
    }
    else if (defaultAtvFis.value === nivelAtvFisInput.value[1]) {
      tmb.value *= 1.375
    } 
    else if (defaultAtvFis.value === nivelAtvFisInput.value[2]) {
      tmb.value *= 1.55
    }
    else if (defaultAtvFis.value === nivelAtvFisInput.value[3]) {
      tmb.value *= 1.725
    }

    const caloriasObjetivo = ref<number>(tmb.value)

    if (defaultObjetivoInput.value === objetivoInput.value[0]) {
      caloriasObjetivo.value -= 450
      gProteinaPorKg = 2.0
      gGorduraPorKg = 0.8
    }
    else if (defaultObjetivoInput.value === objetivoInput.value[2]) {
      caloriasObjetivo.value += 400
      gProteinaPorKg = 2.0
      gGorduraPorKg = 1.0
    }
    else {
      gProteinaPorKg = 1.8
      gGorduraPorKg = 1.0
    }

    const proteinaFinal = ref<number>(gProteinaPorKg * pesoInput.value)
    const gorduraFinal = ref<number>(gGorduraPorKg * pesoInput.value)
    const kcalUsadas: number = (proteinaFinal.value * 4) + (gorduraFinal.value * 9)

    let gCarboPorKg = ref<number>((caloriasObjetivo.value - kcalUsadas) / 4)
    
    const usuarioAtualizado = ref<Usuario>({
      id: user.value?.id,
      email: user.value?.email || '',
        perfil: {
        sexo: defaultSexoInput.value,
        idade: idadeInput.value,
        peso: pesoInput.value,
        altura: alturaInput.value,
        nivelAtvFisic: defaultAtvFis.value,
        objetivo: defaultObjetivoInput.value,
        TMB: tmb.value,
        IMC: imc.value,
        macronutri: {
          proteina: proteinaFinal.value,
          carbo: gCarboPorKg.value,
          gordura: gorduraFinal.value
        }
      }
    })
  }
  catch (err) {
    console.error('Erro inesperado no cálculo:', err)
    return
  }
}

const listaDados = ref([
  {
    tituloTMBIMC: 'Taxa Metabólica Basal',
    description: 'A taxa metabólica basal (TMB) é a quantidade de calorias que seu corpo precisa para realizar funções básicas em repouso, como respirar, manter a temperatura corporal e a circulação sanguínea. Ela representa a energia mínima necessária para manter as funções vitais do corpo.',
    valor: tmb.value
  },

  {
    tituloTMBIMC: 'Índice de Massa Corporal',
    description: 'O índice de massa corporal (IMC) é uma medida que relaciona o peso e a altura de uma pessoa para avaliar se ela está dentro de um peso saudável. O IMC é calculado dividindo o peso em quilogramas pela altura em metros ao quadrado (kg/m²).',
    valor: imc.value
  }
])

</script>

<template>
  <main class="flex justify-around items-center w-full h-[90%]">
    <div class="flex m-8 h-full w-full justify-between gap-4">
      <UPageCard class="w-sm h-full p-4 light:shadow-[0px_0px_10px]" :ui="{
        container: 'justify-center'
      }" spotlight spotlight-color="primary" title="FORMULÁRIO" description="Fale mais sobre você...">
        <UForm @submit.prevent="calcular" class="flex flex-col gap-3">
          <UFormField label="Seu sexo:">
            <USelect v-model="defaultSexoInput" class="flex items-center justify-center w-full" :items="sexoInput" />
          </UFormField>

          <UFormField label="Sua idade:">
            <UInputNumber v-model="idadeInput" class="w-full" :min="14" :max="100" />
          </UFormField>

          <UFormField label="Seu peso (em kg):">
            <UInputNumber v-model="pesoInput" class="w-full" :min="35" :max="150" />
          </UFormField>

          <UFormField label="Sua altura (em cm):">
            <UInputNumber v-model="alturaInput" class="w-full" :min="100" :max="230" />
          </UFormField>

          <UFormField label="Seu nível de atividade física:">
            <USelect v-model="defaultAtvFis" class="flex items-center justify-center w-full"
              :items="nivelAtvFisInput" />
          </UFormField>

          <UFormField label="Seu objetivo:">
            <USelect v-model="defaultObjetivoInput" class="flex items-center justify-center w-full"
              :items="objetivoInput" />
          </UFormField>
          <UButton type="submit" class="w-full">
            Calcular
          </UButton>
        </UForm>
      </UPageCard>

      <UPageCard ip="dadosDiv" class="w-full light:shadow-[0px_0px_10px]" spotlight spotlight-color="primary">
        <div class="flex justify-around gap-5" v-for="(item, index) in listaDados" :key="index">

          <UPageCard class=w-full>
            <p class="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">{{item.tituloTMBIMC}}</p>
            <p class="mt-3 text-3xl font-semibold text-primary">{{ item.valor }} kcal</p>
            <p class="mt-2 text-sm text-neutral-500">Taxa metabólica basal estimada</p>
          </UPageCard>

        </div>

        <UPageGrid>
          <UPageCard>
            <p class="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">Carboidratos</p>
            <p class="mt-3 text-3xl font-semibold text-primary">432 g</p>
            <p class="mt-2 text-sm text-neutral-500">Quantidade diária estimada</p>
          </UPageCard>

          <UPageCard>
            <p class="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">Proteína</p>
            <p class="mt-3 text-3xl font-semibold text-primary">95 g</p>
            <p class="mt-2 text-sm text-neutral-500">Quantidade diária estimada</p>
          </UPageCard>

          <UPageCard>
            <p class="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">Gordura</p>
            <p class="mt-3 text-3xl font-semibold text-primary">45 g</p>
            <p class="mt-2 text-sm text-neutral-500">Quantidade diária estimada</p>
          </UPageCard>
        </UPageGrid>
      </UPageCard>
    </div>
  </main>
</template>
