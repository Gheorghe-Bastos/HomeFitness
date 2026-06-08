<script setup lang="ts">
import HeaderComp from '~/components/headerComp.vue'
import { provide, ref } from 'vue'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.svg' }
  ],
  htmlAttrs: {
    lang: 'pt-br'
  }
})

const title = 'HomeFitness - Seu espaço fitness em casa'
const description = 'Descubra o HomeFit, seu espaço fitness em casa, faça calculos de IMC, macronutrientes de acordo com sua meta para manter-se saudável e em forma sem sair de casa.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://github.com/user-attachments/assets/e647a8b3-ef63-49bf-b74e-e8e7498ded90',
  twitterCard: 'summary_large_image'
})



const erro = ref<boolean>(false)
const erroTitle = ref<string>('')
const erroDescription = ref<string>('')
const abaFitnessAtiva = ref<boolean>(false)

provide('erro', erro)
provide('erroTitle', erroTitle)
provide('erroDescription', erroDescription)
provide('abaFitnessAtiva', abaFitnessAtiva)
</script>

<template>
  <UApp>
    <div class="flex flex-col h-screen">
      <header>
        <HeaderComp />
      </header>

      <main class="flex flex-1 items-center justify-center">
        <NuxtPage />
      </main>

      <USeparator />

      <UFooter>
        <div class="flex lg:flex-col-reverse h-0 lg:h-11 items-center justify-between">
          <p class="text-muted text-sm">
            SALO - Hometech © {{ new Date().getFullYear() }}
          </p>

          <div>
            <UButton
              icon="mdi:linkedin"
              color="neutral"
              variant="ghost"
              to="https://www.linkedin.com/in/gheorghebastos"
              target="_blank"
              aria-label="linkedin"
            />
            <UButton
              icon="i-simple-icons-github"
              color="neutral"
              variant="ghost"
              to="https://github.com/Gheorghe-Bastos"
              target="_blank"
              aria-label="GitHub"
            />
          </div>
        </div>
      </UFooter>
    </div>
  </UApp>
</template>
