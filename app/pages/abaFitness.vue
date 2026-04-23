<script setup>

import { ref, inject, onMounted } from 'vue';

const nivelAtvFis = ref(['Sedentário', 'Baixa Frequência (2-3 dias por semana)', 'Média Frequência (4 dias por semana)', 'Alta Frequência (5-6 dias por semana)'])
const defaultValue = ref('Sedentário')
const sexo = ref(['Masculino', 'Feminino'])
const defaultSexo = ref('Selecione seu sexo')
const objetivo = ref(['Perder peso', 'Manter', 'Ganhar massa'])
const defaultObjetivo = ref('Selecione seu objetivo')

const idade = ref(18)
const peso = ref(70)

</script>

<template>
  <main class="flex justify-around items-center w-full h-[80%]">
    <div class="flex m-8 h-full w-full justify-between gap-4">
      <UPageCard class="w-sm h-full p-4 light:shadow-[0px_0px_10px]" :ui="{
        container: 'justify-center'
      }"  
      spotlight 
      spotlight-color="primary" 
      title="FORMULÁRIO" 
      description="Fale mais sobre você...">
      <UForm class="flex flex-col gap-3" @submit="">
        
        <UFormField label="Seu sexo:">
          <USelect class="flex items-center justify-center w-full" v-model="defaultSexo" :items="sexo" />
        </UFormField>

        <UFormField label="Sua idade:">
          <UInputNumber class="w-full" v-model="idade" :min="14" :max="100" />
        </UFormField>
        
        <UFormField label="Seu peso (em kg):">
          <UInputNumber class="w-full" v-model="peso" :min="35" :max="150" />
        </UFormField>
        
        <UFormField label="Seu nível de atividade física:">
          <USelect class="flex items-center justify-center w-full" v-model="defaultValue" :items="nivelAtvFis" />
        </UFormField>
        
        <UFormField label="Seu objetivo:">
          <USelect class="flex items-center justify-center w-full" v-model="defaultObjetivo" :items="objetivo" />
        </UFormField>
        
      </UForm>
    </UPageCard>
    
      <UPageCard class="w-full light:shadow-[0px_0px_10px]"
      spotlight
      spotlight-color="primary"
      >

      </UPageCard>
    </div>
  </main>
</template>