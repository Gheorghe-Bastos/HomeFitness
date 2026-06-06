<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthController } from '../composables/useLogin'
import { useAbaFitnessController } from '../composables/useAbaFitness'

const {
  carregando
} = useAuthController()

const {
  defaultAtvFis,
  defaultSexoInput,
  defaultObjetivoInput,
  idadeInput,
  pesoInput,
  alturaInput,
  listaDadosTBMIMC,
  listaDadosMacros,
  usuarioAutenticado,
  tabelaExiste,
  sexoInput,
  nivelAtvFisInput,
  objetivoInput,
  carregarSessao,
  calcular
} = useAbaFitnessController()

const carregandoAbaFitness = ref<boolean>(true)

onMounted( async () => {
await carregarSessao(carregandoAbaFitness)
})
</script>

<template>
  <main class="flex justify-around items-center w-full min-h-[90%]">
    <div class="flex flex-col lg:flex-row m-4 sm:m-8 h-full w-full justify-between gap-4">
      <UPageCard class="w-full lg:w-sm h-full p-4 light:shadow-[0px_0px_10px]" :ui="{
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

      <div v-if="carregandoAbaFitness" class="flex flex-col justify-around gap-7 h-full w-full m-0">
        <div class="flex flex-col sm:flex-row justify-around h-full gap-5">
          <USkeleton class="w-full h-full rounded-xl" />
          <USkeleton class="w-full h-full rounded-xl" />
        </div>
        <div class="grid grid-cols-2 sm:flex sm:justify-around h-full gap-3">
          <USkeleton class="w-full h-full rounded-xl" />
          <USkeleton class="w-full h-full rounded-xl" />
          <USkeleton class="w-full h-full rounded-xl" />
          <USkeleton class="w-full h-full rounded-xl" />
        </div>
      </div>      
      <div v-else-if="tabelaExiste" ip="dadosDiv" class="flex flex-col justify-around gap-7 h-full w-full m-0">
        
        <div class="flex flex-col sm:flex-row justify-around h-full gap-5">
          <div class="flex w-full h-full" v-for="(item, index) in listaDadosTBMIMC" :key="index">

            <UPageCard class="w-full h-full light:shadow-[0px_0px_10px]" spotlight spotlight-color="primary">
              <p class="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">{{ item.tituloTMBIMC }}</p>
              <p class="mt-3 text-3xl font-semibold text-primary">{{ item.valor }} {{ item.unidade }}</p>
              <p class="mt-2 text-sm text-neutral-500">{{ item.description }}</p>
            </UPageCard>

          </div>
        </div>

        <div class="grid grid-cols-2 sm:flex sm:justify-around h-full gap-3">

          <UPageCard class="w-full h-full light:shadow-[0px_0px_10px]" spotlight spotlight-color="primary">
            <p class="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">Gasto Energético Total</p>
            <p class="mt-3 text-3xl font-semibold text-primary">{{ usuarioAutenticado.perfil?.GET }} kcal</p>
            <p class="mt-2 text-sm text-neutral-500">Este é o seu gasto energético diário levando em conta sua atividade
              física.</p>
          </UPageCard>


          <div class="w-full h-full" v-for="(itens, index) in listaDadosMacros" :key="index">
            <UPageCard class="flex h-full light:shadow-[0px_0px_10px]" spotlight spotlight-color="primary">
              <p class="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">{{ itens.tituloMacro }}</p>
              <p class="mt-3 text-3xl font-semibold text-primary">{{ itens.valor }} {{ itens.unidade }}</p>
              <p class="mt-2 text-sm text-neutral-500">Quantidade diária estimada para a sua meta desejada.</p>
            </UPageCard>
          </div>

        </div>
      </div>

      <UPageCard v-else class="w-full h-full font-bold p-4 light:shadow-[0px_0px_10px]" :ui="{
        container: 'justify-center items-center'
      }" spotlight spotlight-color="primary" title="PREENCHA SEUS DADOS"
        description="Veja os resultados do seu cálculo após preencher todos os dados." />

    </div>
  </main>
</template>
