<script setup lang="ts">
import { inject, ref } from 'vue';
import type { Usuario } from '../types/usuario';

const supabase = useSupabaseClient()

const erro = inject<Ref<boolean>>('erro', ref(false))
const erroDescription = inject<Ref<string>>('erroDescription', ref(''))
const emailInput = ref<string>('')
const senhaInput = ref<string>('')
const cadastrar = ref<boolean>(false)
const toast = useToast()

async function entrar(){
  console.log('Autenticando usuário...')
  erro.value = false
  const userEmail: string = emailInput.value.trim()
  const userPassword: string = senhaInput.value.trim()

  if (userEmail === '' || userPassword === '') {
    erro.value = true
    erroDescription.value = 'Por favor, preencha todos os campos.'

    return
  }

  try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword,
    })

    console.log('Resposta do supabase.login:', { data, loginError })

    if (loginError) {
      
      if (loginError.status === 400) {
        erro.value = true
        erroDescription.value = 'Email ou senha incorretos. Por favor, tente novamente.'
        return
      }

      if (loginError.status === 422) {
        erro.value = true
        erroDescription.value = 'Este email já está em uso. Por favor, tente outro email ou faça login.'
        return
      }
      
      erro.value = true
      erroDescription.value = loginError.message
      console.log('Login falhou:', loginError.message)
      return
    }
    
    const usuarioLogado: Usuario = {
      id: data?.user?.id || '',
      email: userEmail
    }

    console.log('Login bem sucedido, usuário:', usuarioLogado)
    await navigateTo('/abaFitness')
  }

  catch (err) {
    console.error('Erro inesperado no login:', err)
    erro.value = true
    erroDescription.value = 'Ocorreu um erro durante o login. Por favor, tente novamente.'
    return
  }

  finally {
    emailInput.value = ''
    senhaInput.value = ''
  }
}

async function cadastro() {
  erro.value = false
  const userEmail = emailInput.value.trim()
  const userPassword = senhaInput.value.trim()

  if (userEmail === '' || userPassword === '') {
    erro.value = true
    erroDescription.value = 'Por favor, preencha todos os campos.'

    return
  }

  try {
    const { data, error: registerError } = await supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
    })

    console.log('Resposta do supabase.signUp:', { data, registerError })

    if (registerError) {
      console.log('Cadastro falhou:', registerError.message)

      if (registerError.status === 422) {
        erro.value = true
        erroDescription.value = 'Senha inválida ou o email já está em uso. Tente outro email ou crie uma senha de no minimo 6 dígitos.'
        return
      }

      erro.value = true
      erroDescription.value = 'Ocorreu um erro durante o cadastro. Por favor, tente novamente.'
      return
    }

    toast.add({ title: 'Cadastro bem sucedido', description: 'Redirecionando para a pagina principal...' })

    const usuarioLogado: Usuario = {
      id: data?.user?.id || '',
      email: userEmail
    }
    
    console.log('Cadastro bem sucedido, usuário:', usuarioLogado)
    await navigateTo('/abaFitness')
  }

  catch (err) {
    console.error('Erro inesperado no cadastro:', err)
    erro.value = true
    erroDescription.value = 'Ocorreu um erro durante o cadastro. Por favor, tente novamente.'
    return
  }

  finally {
    emailInput.value = ''
    senhaInput.value = ''
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageHero
      class="w-4xl"
      title="SEU ESPAÇO FITNESS"
      description="Descubra sua Taxa Metabólica Basal, IMC e Macronutrientes para manter-se saudável e em forma antes mesmo de sair de casa."
      :ui="{
        container: 'py-5 sm:py-5 lg:py-3'
      }"
    />

    <UPageCard
      v-if="cadastrar"
      class=" flex flex-col items-center justify-center w-full max-w-md p-2 w-xl
    light:shadow-[0px_0px_10px]"
      :ui="{ container: 'gap-x-6 gap-y-3' }"
    >
      <div class="flex flex-col mb-2">
        <UIcon
          name="line-md:account"
          class="w-12 h-12 text-neutral mx-auto"
        />
        <div class="flex flex-col justify-center items-center">
          <h2 class="text-2xl font-medium">
            Cadastro
          </h2>
          <p>Insira suas informações para cadastrar sua conta.</p>
        </div>
      </div>

      <UForm
        class="flex flex-col gap-3"
        @submit.prevent="cadastro"
      >
        <p
          v-if="erro"
          class="flex justify-center text-sm text-red-400"
        >
          {{ erroDescription }}
        </p>

        <UFormField label="Email">
          <UInput
            v-model="emailInput"
            class="w-full"
            type="email"
            placeholder="Digite seu email"
          />
        </UFormField>

        <UFormField label="Senha">
          <UInput
            v-model="senhaInput"
            class="w-full rounded-[0.5rem]"
            type="password"
            placeholder="Digite sua senha"
          />
        </UFormField>

        <UButton
          type="submit"
          color="primary"
          variant="solid"
          class="w-full flex items-center justify-center"
        >
          CADASTRAR
        </UButton>

        <div class="flex w-full items-end">
          <UButton
            color="neutral"
            variant="subtle"
            class="w-full flex items-center justify-center"
            @click="cadastrar = false"
          >
            JÁ POSSUO UMA CONTA
          </UButton>
        </div>
      </UForm>
    </UPageCard>

    <UPageCard
      v-else
      class="flex flex-col items-center justify-center w-full max-w-md p-2 w-xl
      light:shadow-[0px_0px_10px]"
      :ui="{ container: 'gap-x-6 gap-y-3' }"
    >
      <div class="flex flex-col mb-2">
        <UIcon
          name="line-md:account"
          class="w-12 h-12 text-neutral mx-auto"
        />
        <div class="flex flex-col justify-center items-center">
          <h2 class="text-2xl font-medium">
            Login
          </h2>
          <p>Insira suas credenciais para acessar sua conta.</p>
        </div>
      </div>

      <UForm
        class="flex flex-col gap-3"
        @submit.prevent="entrar"
      >
        <p
          v-if="erro"
          class="flex justify-center text-sm text-red-400"
        >
          {{ erroDescription }}
        </p>

        <UFormField label="Email">
          <UInput
            v-model="emailInput"
            class="w-full"
            type="email"
            placeholder="Digite seu email"  
          />
        </UFormField>

        <UFormField label="Senha">
          <UInput
            v-model="senhaInput"
            class="w-full rounded-[0.5rem]"
            type="password"
            placeholder="Digite sua senha"
          />
        </UFormField>

        <UButton
          type="submit"
          color="primary"
          variant="solid"
          class="w-full flex items-center justify-center"
        >
          ENTRAR
        </UButton>

        <div class="flex w-full items-end">
          <UButton
            color="neutral"
            variant="subtle"
            class="w-full flex items-center justify-center"
            @click="cadastrar = true"
          >
            CADASTRAR
          </UButton>
        </div>
      </UForm>
    </UPageCard>
  </div>
</template>
