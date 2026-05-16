<script setup lang="ts">
import { ref } from 'vue'
import type { Usuario, Sexo, StatusAtvFisic, Objetivo } from '../types/usuario' 



const nivelAtvFisInput = ref<string[]>(['Sedentário', 'Baixa Frequência (2-3 dias por semana)', 'Média Frequência (4 dias por semana)', 'Alta Frequência (5-6 dias por semana)'])
const defaultAtvFis = ref('Sedentário')
const sexoInput = ref<string[]>(['Masculino', 'Feminino'])
const defaultSexoInput = ref('Selecione seu sexo')
const objetivoInput = ref<string[]>(['Perder peso', 'Manter', 'Ganhar massa'])
const defaultObjetivoInput = ref('Selecione seu objetivo')

const idadeInput = ref<number>(18)
const pesoInput = ref<number>(70)
</script>

<template>
  <main class="flex justify-around items-center w-full h-[80%]">
    <div class="flex m-8 h-full w-full justify-between gap-4">
      <UPageCard
        class="w-sm h-full p-4 light:shadow-[0px_0px_10px]"
        :ui="{
          container: 'justify-center'
        }"
        spotlight
        spotlight-color="primary"
        title="FORMULÁRIO"
        description="Fale mais sobre você..."
      >
        <UForm
          class="flex flex-col gap-3"
        >
          <UFormField label="Seu sexo:">
            <USelect
              v-model="defaultSexoInput"
              class="flex items-center justify-center w-full"
              :items="sexoInput"
            />
          </UFormField>

          <UFormField label="Sua idade:">
            <UInputNumber
              v-model="idadeInput"
              class="w-full"
              :min="14"
              :max="100"
            />
          </UFormField>

          <UFormField label="Seu peso (em kg):">
            <UInputNumber
              v-model="pesoInput"
              class="w-full"
              :min="35"
              :max="150"
            />
          </UFormField>

          <UFormField label="Seu nível de atividade física:">
            <USelect
              v-model="defaultAtvFis"
              class="flex items-center justify-center w-full"
              :items="nivelAtvFisInput"
            />
          </UFormField>

          <UFormField label="Seu objetivo:">
            <USelect
              v-model="defaultObjetivoInput"
              class="flex items-center justify-center w-full"
              :items="objetivoInput"
            />
          </UFormField>
        </UForm>
      </UPageCard>

      <UPageCard
        class="w-full light:shadow-[0px_0px_10px]"
        spotlight
        spotlight-color="primary"
      />
    </div>
  </main>
</template>
