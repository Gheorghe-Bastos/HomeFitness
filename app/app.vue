<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'pt-br'
  }
})

const title = 'HomeFit - Seu espaço fitness em casa'
const description = 'Descubra o HomeFit, seu espaço fitness em casa, faça calculos de IMC, macronutrientes, e acesse uma variedade de exercícios para manter-se saudável e em forma sem sair de casa.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
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
        <div class="flex flex-col-reverse items-center justify-between">
          <p class="text-muted text-sm">SALO - Hometech © {{ new Date().getFullYear() }}</p>
          <UNavigationMenu :items="items" variant="link" />

          <div>
            <UButton icon="i-simple-icons-discord" color="neutral" variant="ghost" to="https://go.nuxt.com/discord"
              target="_blank" aria-label="Discord" />
            <UButton icon="i-simple-icons-x" color="neutral" variant="ghost" to="https://go.nuxt.com/x" target="_blank"
              aria-label="X" />
            <UButton icon="i-simple-icons-github" color="neutral" variant="ghost" to="https://github.com/nuxt/nuxt"
              target="_blank" aria-label="GitHub" />
          </div>
        </div>
      </UFooter>
    </div>
  </UApp>
</template>
