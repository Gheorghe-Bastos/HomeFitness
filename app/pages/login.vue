<script setup lang="ts">

function autenticacao() {
  console.log('Autenticando usuário...')
}

</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
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

      <UButton color="primary" variant="solid" class="w-full flex items-center justify-center" @click="autenticacao">Entrar</UButton>

    </UPageCard>
  </div>
</template>