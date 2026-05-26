<script setup lang="ts">

import { useAuthController } from '../composables/useAuthController'

const {
  emailInput,
  senhaInput,
  cadastrar,
  entrar,
  cadastro,
  erro,
  erroDescription
} = useAuthController()

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
