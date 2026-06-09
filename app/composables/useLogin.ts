import { ref, inject, type Ref } from 'vue'
import type { Usuario } from '../types/usuario'

export const useAuthController = () => {
  const supabase = useSupabaseClient()
  const erro = inject<Ref<boolean>>('erro', ref(false))
  const erroDescription = inject<Ref<string>>('erroDescription', ref(''))
  const emailInput = ref<string>('')
  const senhaInput = ref<string>('')
  const carregando = ref<boolean>(false)
  const cadastrar = ref<boolean>(false)
  const toast = useToast()

  async function entrar() {
    console.log('Autenticando usuário...')
    erro.value = false
    const userEmail: string = emailInput.value.trim()
    const userPassword: string = senhaInput.value.trim()

    if (userEmail === '' || userPassword === '') {
      erro.value = true
      erroDescription.value = 'Por favor, preencha todos os campos.'

      return
    }
    carregando.value = true

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPassword
      })

      console.log('Resposta do supabase.login:', { data, loginError })

      if (loginError) {
        if (loginError.status === 400) {
          erro.value = true
          carregando.value = false
          erroDescription.value = 'Email ou senha incorretos. Por favor, tente novamente.'
          return
        }

        if (loginError.status === 422) {
          erro.value = true
          carregando.value = false
          erroDescription.value = 'Este email já está em uso. Por favor, tente outro email ou faça login.'
          return
        }

        erro.value = true
        carregando.value = false
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
    } catch (err) {
      console.error('Erro inesperado no login:', err)
      erro.value = true
      carregando.value = false
      erroDescription.value = 'Ocorreu um erro durante o login. Por favor, tente novamente.'
      return
    } finally {
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
    carregando.value = true

    try {
      const { data, error: registerError } = await supabase.auth.signUp({
        email: userEmail,
        password: userPassword
      })

      console.log('Resposta do supabase.signUp:', { data, registerError })

      if (registerError) {
        console.log('Cadastro falhou:', registerError.message)

        if (registerError.status === 422) {
          erro.value = true
          carregando.value = false
          erroDescription.value = 'Senha inválida ou o email já está em uso. Tente outro email ou crie uma senha de no minimo 6 dígitos.'
          return
        }

        erro.value = true
        carregando.value = false
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
    } catch (err) {
      console.error('Erro inesperado no cadastro:', err)
      erro.value = true
      carregando.value = false
      erroDescription.value = 'Ocorreu um erro durante o cadastro. Por favor, tente novamente.'
      return
    } finally {
      emailInput.value = ''
      senhaInput.value = ''
    }
  }

  return { emailInput, senhaInput, cadastrar, carregando, entrar, cadastro, erro, erroDescription }
}
