<script setup lang="ts">

function autenticacao() {
  console.log('Autenticando usuário...')
}

</script>

<template>



  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageHero class="w-4xl" title="SEU ESPAÇO FITNESS" description="Faça calculos de IMC e macronutrientes para manter-se saudável e em forma sem sair de casa." 
    :ui="{
      container: 'py-5 sm:py-5 lg:py-5'
    }"/>
    <UPageCard class=" flex flex-col items-center justify-center w-full max-w-md p-2 w-xl
    light:shadow-[0px_0px_10px]">
      <div class="flex flex-col mb-2">
        <UIcon name="i-heroicons-user" class="w-12 h-12 text-neutral mx-auto" />
        <div class="flex flex-col justify-center items-center">
          <h2 class="text-2xl font-medium">Login</h2>
          <p>Insira suas credenciais para acessar sua conta.</p>
        </div>
      </div>

      <UFormField label="Email">
        <UInput class="w-full" type="email" placeholder="Digite seu email" />
      </UFormField>

      <UFormField label="Senha">
        <UInput class="w-full rounded-[0.5rem]" type="password" placeholder="Digite sua senha" />
      </UFormField>

      <UButton color="primary" variant="solid" class="w-full flex items-center justify-center" @click="autenticacao">
        Entrar</UButton>

    </UPageCard>
  </div>
</template>