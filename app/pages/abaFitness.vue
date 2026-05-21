<script setup lang="ts">
import { ref } from 'vue'
import { Sexo, type Usuario, StatusAtvFisic, Objetivo } from '../types/usuario'
import type { SelectItem } from '@nuxt/ui'

const supabase = useSupabaseClient<any>()
const user = useSupabaseUser()

const tabelaExiste = ref<boolean>(false)
const usuarioAutenticado = ref<Usuario>({
  id: '',
  email: '',
})

const {data: { session }} = await supabase.auth.getSession()
  
if (session?.user) {
  usuarioAutenticado.value = {
    id: session.user.id,
    email: session.user.email || '',
  }
}

async function verificarDadosUsuario() {
  if (!usuarioAutenticado.value.id) {
    console.error('Usuário não autenticado. Não é possível verificar dados sem um usuário válido.')
    return
  }
  const { data, error: selectError } = await supabase
    .from('usuario')
    .select('perfil')
    .eq('id', usuarioAutenticado.value.id)
    .single()

  if (selectError) {
    console.error('Erro ao buscar dados do usuário:', selectError)
    return
  }

  if (data?.perfil) {
    usuarioAutenticado.value.perfil = data.perfil
    console.log('Dados do usuário encontrados:', data)
    tabelaExiste.value = true
    return
  }
}

verificarDadosUsuario()

const defaultAtvFis = ref<StatusAtvFisic>(StatusAtvFisic.sedentario)
const defaultSexoInput = ref<Sexo>(Sexo.masculino)
const defaultObjetivoInput = ref<Objetivo>(Objetivo.manter)

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

let gProteinaPorKg: number = 0
let gGorduraPorKg: number = 0

async function calcular() {

  if (!usuarioAutenticado.value.id) {
    console.error('Usuário não autenticado. Não é possível calcular sem um usuário válido.')
    return
  }

  const imc: number = pesoInput.value / ((alturaInput.value / 100) ** 2)
  const imcFormatado = ref<number>(parseFloat(imc.toFixed(2)))
  const tmb = ref<number>((10 * pesoInput.value) + (6.25 * alturaInput.value) - (5 * idadeInput.value))

  try {

    let multiplicador: number = 1.2

    if (defaultSexoInput.value === Sexo.masculino) {
      tmb.value += 5
    }
    else {
      tmb.value -= 161
    }

    if (defaultAtvFis.value === StatusAtvFisic.baixaFreq) {
      multiplicador = 1.375
    }
    else if (defaultAtvFis.value === StatusAtvFisic.mediaFreq) {
      multiplicador = 1.55
    }
    else if (defaultAtvFis.value === StatusAtvFisic.altaFreq) {
      multiplicador = 1.725
    }

    const get = ref<number>(Math.round(tmb.value * multiplicador))

    const caloriasObjetivo = ref<number>(get.value)

    if (defaultObjetivoInput.value === Objetivo.perderPeso) {
      caloriasObjetivo.value -= 450
      gProteinaPorKg = 2.0
      gGorduraPorKg = 0.8
    }
    else if (defaultObjetivoInput.value === Objetivo.ganhoMassa) {
      caloriasObjetivo.value += 400
      gProteinaPorKg = 2.0
      gGorduraPorKg = 1.0
    }
    else {
      gProteinaPorKg = 1.8
      gGorduraPorKg = 1.0
    }

    const proteinaFinal = ref<number>(Math.round(gProteinaPorKg * pesoInput.value))
    const gorduraFinal = ref<number>(Math.round(gGorduraPorKg * pesoInput.value))
    const kcalUsadas: number = (proteinaFinal.value * 4) + (gorduraFinal.value * 9)

    const gCarboPorKg = ref<number>(Math.round((caloriasObjetivo.value - kcalUsadas) / 4))
    
    usuarioAutenticado.value = {
      id: usuarioAutenticado.value.id,
      email: usuarioAutenticado.value.email || '',
      perfil: {
        sexo: defaultSexoInput.value,
        idade: idadeInput.value,
        peso: pesoInput.value,
        altura: alturaInput.value,
        nivelAtvFisic: defaultAtvFis.value,
        objetivo: defaultObjetivoInput.value,
        TMB: tmb.value,
        GET: get.value,
        IMC: imcFormatado.value,
        macronutri: {
          proteina: proteinaFinal.value,
          carbo: gCarboPorKg.value,
          gordura: gorduraFinal.value
        }
      }
    }

    const { error: dbError } = await supabase
      .from('usuario')
      .insert({
        id: usuarioAutenticado.value.id,
        email: usuarioAutenticado.value.email,
        perfil: usuarioAutenticado.value.perfil
      })
    
    if (dbError) {
      console.error('Erro ao salvar os dados no banco:', dbError.message)
      return
    }
     
    console.log('Dados salvos com sucesso no banco de dados!')
    console.log(usuarioAutenticado.value)

    tabelaExiste.value = true

  }
  catch (err) {
    console.error('Erro inesperado no cálculo:', err)
    return
  }
}

const listaDadosTBMIMC = computed(() => {

  if (!tabelaExiste.value || !usuarioAutenticado.value.perfil) return []

  return [
    {
      tituloTMBIMC: 'Taxa Metabólica Basal',
      description: 'A taxa metabólica basal (TMB) é a quantidade de calorias que seu corpo precisa para realizar funções básicas em repouso, como respirar, manter a temperatura corporal e a circulação sanguínea. Ela representa a energia mínima necessária para manter as funções vitais do corpo.',
      valor: usuarioAutenticado.value.perfil.TMB,
      unidade: 'kcal/dia'
    },

    {
      tituloTMBIMC: 'Índice de Massa Corporal',
      description: 'O índice de massa corporal (IMC) é uma medida que relaciona o peso e a altura de uma pessoa para avaliar se ela está dentro de um peso saudável. O IMC é calculado dividindo o peso em quilogramas pela altura em metros ao quadrado (kg/m²).',
      valor: usuarioAutenticado.value.perfil.IMC,
      unidade: 'kg/m²'
    }
  ]
})

const listaDadosMacros = computed(() => {
  if (!tabelaExiste.value || !usuarioAutenticado.value.perfil) return []

  return [
    {
      tituloMacro: 'Carboidratos',
      description: 'Os carboidratos são a principal fonte de energia para o corpo. Eles são encontrados em alimentos como pães, massas, arroz, frutas e vegetais. A quantidade de carboidratos que uma pessoa deve consumir diariamente pode variar dependendo do seu nível de atividade física, objetivos e necessidades individuais.',
      valor: usuarioAutenticado.value.perfil.macronutri.carbo,
      unidade: 'g/dia'
    },

    {
      tituloMacro: 'Proteínas',
      description: 'As proteínas são essenciais para a construção e reparação dos tecidos do corpo, além de desempenharem um papel importante na função imunológica e na produção de enzimas e hormônios. Alimentos ricos em proteínas incluem carnes, peixes, ovos, laticínios, leguminosas e nozes.',
      valor: usuarioAutenticado.value.perfil.macronutri.proteina,
      unidade: 'g/dia'
    },

    {
      tituloMacro: 'Gorduras',
      description: 'As gorduras são uma fonte concentrada de energia e são importantes para a absorção de vitaminas lipossolúveis (A, D, E e K), além de desempenharem um papel crucial na saúde celular e na produção de hormônios. Fontes saudáveis de gorduras incluem abacate, azeite de oliva, nozes, sementes e peixes gordurosos.',
      valor: usuarioAutenticado.value.perfil.macronutri.gordura,
      unidade: 'g/dia'
    }
  ]
})

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


      <UPageCard v-if="tabelaExiste" ip="dadosDiv" class="w-full light:shadow-[0px_0px_10px]">
        <div class="flex justify-around gap-5">
          <div class="flex w-full" v-for="(item, index) in listaDadosTBMIMC" :key="index">

            <UPageCard class="w-full light:shadow-[0px_0px_10px]" spotlight spotlight-color="primary">
              <p class="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">{{ item.tituloTMBIMC }}</p>
              <p class="mt-3 text-3xl font-semibold light:text-primary">{{ item.valor }} {{ item.unidade }}</p>
              <p class="mt-2 text-sm text-neutral-500">{{ item.description }}</p>
            </UPageCard>

          </div>
        </div>

        <div class="flex justify-around gap-3">

          <UPageCard class="w-full light:shadow-[0px_0px_10px]" spotlight spotlight-color="primary">
            <p class="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">Gasto Energético Total</p>
            <p class="mt-3 text-3xl font-semibold light:text-primary">{{ usuarioAutenticado.perfil?.GET }} kcal</p>
            <p class="mt-2 text-sm text-neutral-500">Este é o seu gasto energético diário levando em conta sua atividade
              física.</p>
          </UPageCard>


          <div class="w-full" v-for="(itens, index) in listaDadosMacros" :key="index">
            <UPageCard class="flex h-full light:shadow-[0px_0px_10px]" spotlight spotlight-color="primary">
              <p class="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">{{ itens.tituloMacro }}</p>
              <p class="mt-3 text-3xl font-semibold light:text-primary">{{ itens.valor }} {{ itens.unidade }}</p>
              <p class="mt-2 text-sm text-neutral-500">Quantidade diária estimada para a sua meta desejada.</p>
            </UPageCard>
          </div>

        </div>
      </UPageCard>

      <UPageCard v-else class="w-full h-full font-bold p-4 light:shadow-[0px_0px_10px]" :ui="{
        container: 'justify-center items-center'
      }" spotlight spotlight-color="primary" title="PREENCHA SEUS DADOS"
        description="Veja os resultados do seu cálculo após preencher todos os dados." />

    </div>
  </main>
</template>
