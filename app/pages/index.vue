<script setup>
import { inject, ref } from 'vue';

const usuarios = inject("usuarios");
const erro = inject("erro");
const erroTitle = inject("erroTitle");
const erroDescription = inject("erroDescription");
const emailInput = ref('');
const senhaInput = ref('');
const cadastrar = ref(false);
const toast = useToast();

async function autenticacao() {
  console.log('Autenticando usuário...')
  erro.value = false;
  const userEmail = emailInput.value.trim();
  const userPassword = senhaInput.value.trim();


  if (userEmail === '' || userPassword === '') {
    erro.value = true;
    erroDescription.value = 'Por favor, preencha todos os campos.';

    return;
  }

  const usuarioEncontrado = usuarios.value.find(u => u.email === userEmail);

  if (!usuarioEncontrado) {
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

    emailInput.value = '';
    senhaInput.value = '';

    await navigateTo('/abaFitness');
  }
}

async function cadastro() {
  erro.value = false;
  const userEmail = emailInput.value.trim();
  const userPassword = senhaInput.value;

  if (!userEmail || !userPassword) {
    erro.value = true;
    erroDescription.value = 'Por favor, preencha todos os campos.';

    return;
  };

  const usuarioExiste = usuarios.value.find(u => u.email === userEmail);

  if (usuarioExiste) {
    erro.value = true;
    erroDescription.value = 'Este email já está cadastrado. Por favor, use outro email.';

    return false;
  }

  const novoUsuario = {
    email: userEmail,
    senha: userPassword
  };

  usuarios.value.push(novoUsuario);

  console.log(usuarios.value.at(-1))

  toast.add({ title: 'Login bem sucedido', description: 'Redirecionando para a pagina principal...' })

  await navigateTo('/abaFitness');
}

</script>

<template>


  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageHero class="w-4xl" title="SEU ESPAÇO FITNESS"
      description="Descubra sua Taxa Metabólica Basal, IMC e Macronutrientes para manter-se saudável e em forma antes mesmo de sair de casa." :ui="{
        container: 'py-5 sm:py-5 lg:py-3'
      }" />

    <UPageCard v-if="cadastrar" class=" flex flex-col items-center justify-center w-full max-w-md p-2 w-xl
    light:shadow-[0px_0px_10px]" :ui="{ container: 'gap-x-6 gap-y-3' }">
      <div class="flex flex-col mb-2">
        <UIcon name="line-md:account" class="w-12 h-12 text-neutral mx-auto" />
        <div class="flex flex-col justify-center items-center">
          <h2 class="text-2xl font-medium">Cadastro</h2>
          <p>Insira suas informações para cadastrar sua conta.</p>
        </div>
      </div>


      <UForm class="flex flex-col gap-3" @submit="cadastro">

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
      </UForm>
    </UPageCard>


    <UPageCard v-else="cadastrar" class="flex flex-col items-center justify-center w-full max-w-md p-2 w-xl
      light:shadow-[0px_0px_10px]" :ui="{ container: 'gap-x-6 gap-y-3' }">

      <div class="flex flex-col mb-2">
        <UIcon name="line-md:account" class="w-12 h-12 text-neutral mx-auto" />
        <div class="flex flex-col justify-center items-center">
          <h2 class="text-2xl font-medium">Login</h2>
          <p>Insira suas credenciais para acessar sua conta.</p>
        </div>

      </div>

      <UForm class="flex flex-col gap-3" @submit="autenticacao">
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
      </UForm>
    </UPageCard>
  </div>
</template>