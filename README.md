Bem-vindo ao [Home Fitness](https://home-fitness-pi.vercel.app/login), uma aplicação web full-stack desenvolvida para ajudar você a calcular, monitorar e gerenciar suas metas de saúde e rotinas de exercícios sem sair de casa. 

O projeto utiliza o ecossistema moderno do **Nuxt 3** aliado ao **Supabase** para entregar uma experiência rápida, segura e totalmente personalizada para o usuário.

---

<table>
  <tr>
    <td>
      <img width="706" height="369" alt="tela de login" src="https://github.com/user-attachments/assets/e647a8b3-ef63-49bf-b74e-e8e7498ded90" />
    </td>
    <td>
      <img width="165" height="369" alt="tela de login mobile" src="https://github.com/user-attachments/assets/31236c69-251c-487b-8f26-12f94b3b6aa2" />
    </td>
  </tr>
</table>

## 🎯 Funcionalidades Principais

* **Autenticação Segura:** Criação de conta e login gerenciados via Supabase Auth.
* **Perfil de Saúde Personalizado:** O usuário insere dados vitais como idade, peso, altura, gênero e nível de atividade física.
* **Calculadora de Saúde Integrada:**
    * **TMB (Taxa Metabólica Basal):** Descubra quantas calorias seu corpo gasta em repouso.
    * **IMC (Índice de Massa Corpórea):** Diagnóstico rápido da composição corporal.
* **Metas de Macronutrientes:** Cálculo automatizado de Proteínas, Carboidratos e Gorduras diárias com base no objetivo do usuário (Emagrecimento, Hipertrofia ou Manutenção).
* **Interface Responsiva & Dark Mode:** Layout adaptável para celulares, tablets e desktops com suporte nativo a tema escuro através do Nuxt UI.

---

<table>
  <tr>
    <td>
      <img width="706" height="369" alt="tela de cálculo nutricional" src="https://github.com/user-attachments/assets/d44fc3bc-82ac-4c10-92f5-b8486e265e64" />
    </td>
    <td>
      <img width="165" height="369" alt="206976" src="https://github.com/user-attachments/assets/4aaafeb2-aa5d-4f23-87db-9f40aa1183ea" />
    </td>
    <td>
      <img width="165" height="369" alt="206977" src="https://github.com/user-attachments/assets/73b07ee2-b3cf-40d5-b64f-3e94b29903c9" />
    </td>
  </tr>
</table>

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando o que há de mais moderno no desenvolvimento web:

* **Framework Principal:** [Nuxt.js (v3)](https://nuxt.com/) - Framework Vue.js de alta performance com SSR (Server-Side Rendering).
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/) - Tipagem estática para um código mais seguro e escalável.
* **Interface & Estilização:** [Nuxt UI](https://ui.nuxt.com/) / [Tailwind CSS](https://tailwindcss.com/) - Componentes acessíveis e estilização utilitária ágil.
* **Backend como Serviço (BaaS):** [Supabase](https://supabase.com/) - Banco de dados PostgreSQL, Autenticação de usuários e API em tempo real.
* **Hospedagem & Deploy:** [Vercel](https://vercel.com/) - Deploy contínuo e otimizado para aplicações Nuxt.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado e o gerenciador de pacotes `pnpm`.

### 1. Clonar o Repositório e Instalar Dependências
```bash
# Instale as dependências do projeto
pnpm install
