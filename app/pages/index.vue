<script setup>
import { inject, ref } from 'vue';

const usuarios = inject("usuarios");
const erro = inject("erro");
const erroTitle = inject("erroTitle");
const erroDescription = inject("erroDescription");
const emailInput = ref('');
const senhaInput = ref('');
const cadastrar = ref(false);

function autenticacao() {
  console.log('Autenticando usuário...')
  erro.value = false;
  erroDescription.value = '';
  const userEmail = emailInput.value;
  const userPassword = senhaInput.value;

  if (!userEmail || !userPassword) {
    erro.value = true;
    erroDescription.value = 'Por favor, preencha todos os campos.';

    return false;
  }

  const usuarioEncontrado = usuarios.find(u => u.email === userEmail);

  if (!usuarioEncontrado || usuarioEncontrado.senha !== userPassword) {
    erro.value = true;
    erroDescription.value = 'Usuário inválido, tente novamente.';
    emailInput.value = '';
    senhaInput.value = '';

    return;
  }

  if (usuarioEncontrado) {

    if (usuarioEncontrado.senha !== userPassword) {
      erro.value = true;
      erroDescription.value = 'Senha incorreta, tente novamente.';
      senhaInput.value = '';

      return;
    }
    console.log('Usuário autenticado com sucesso:', usuarioEncontrado);

    const usuarioNovo = {
      email: userEmail,
      senha: userPassword
    }

    usuarios.push(usuarioNovo);

    emailInput.value = '';
    senhaInput.value = '';

    navigateTo('/abaFitness');
  }
}

</script>

<template>


  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageHero class="w-4xl" title="SEU ESPAÇO FITNESS"
      description="Faça calculos de IMC e macronutrientes para manter-se saudável e em forma sem sair de casa." :ui="{
        container: 'py-5 sm:py-5 lg:py-5'
      }" />

    <UPageCard v-if="cadastrar" class=" flex flex-col items-center justify-center w-full max-w-md p-2 w-xl
    light:shadow-[0px_0px_10px]"
    :ui="{ container: 'gap-x-6 gap-y-2'}">
      <div class="flex flex-col mb-2">
        <UIcon name="line-md:account" class="w-12 h-12 text-neutral mx-auto" />
        <div class="flex flex-col justify-center items-center">
          <h2 class="text-2xl font-medium">Cadastro</h2>
          <p>Insira suas informações para cadastrar sua conta.</p>
        </div>
      </div>

      <p v-if="erro" class="flex justify-center text-sm text-red-400">{{ erroDescription }}</p>

      <UFormField label="Email">
        <UInput v-model="emailInput" class="w-full" type="email" placeholder="Digite seu email" />
      </UFormField>

      <UFormField label="Senha">
        <UInput v-model="senhaInput" class="w-full rounded-[0.5rem]" type="password" placeholder="Digite sua senha" />
      </UFormField>

      <UButton color="primary" variant="solid" class="w-full flex items-center justify-center" @click="cadastro">
        CADASTRAR</UButton>

      <div class="flex w-full items-end">
        <UButton color="neutral" variant="subtle" class="w-full flex items-center justify-center"
          @click="cadastrar = false">
          JÁ POSSUO UMA CONTA</UButton>
      </div>

    </UPageCard>

    <UPageCard v-else="cadastrar" class="flex flex-col items-center justify-center w-full max-w-md p-2 w-xl
      light:shadow-[0px_0px_10px]"
      :ui="{ container: 'gap-x-6 gap-y-2' }">

      <div class="flex flex-col mb-2">
        <UIcon name="line-md:account" class="w-12 h-12 text-neutral mx-auto" />
        <div class="flex flex-col justify-center items-center">
          <h2 class="text-2xl font-medium">Login</h2>
          <p>Insira suas credenciais para acessar sua conta.</p>
        </div>

      </div>

      <p v-if="erro" class="flex justify-center text-sm text-red-400">{{ erroDescription }}</p>
      
      <UFormField label="Email">
        <UInput v-model="emailInput" class="w-full" type="email" placeholder="Digite seu email" />
      </UFormField>

      <UFormField label="Senha">
        <UInput v-model="senhaInput" class="w-full rounded-[0.5rem]" type="password" placeholder="Digite sua senha" />
      </UFormField>

      <UButton color="primary" variant="solid" class="w-full flex items-center justify-center" @click="autenticacao">
        ENTRAR</UButton>

      <div class="flex w-full items-end">
        <UButton color="neutral" variant="subtle" class="w-full flex items-center justify-center"
          @click="cadastrar = true">
          CADASTRAR</UButton>
      </div>

    </UPageCard>
  </div>
</template>