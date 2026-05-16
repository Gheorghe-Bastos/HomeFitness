enum Sexo {
    masculino = 'Masculino',
    feminino = 'Feminino'
}

enum StatusAtvFisic {
    sedentario = 'Sedentário(a)',
    baixaFreq = 'Baixa Frequencia (2 - 3 dias por semana)',
    mediaFreq = 'Média Frequência (4 dias por semana)',
    altaFrequencia = 'Alta Frequência (5-6 dias por semana)'
}

enum Objetivo {
  perderPeso = 'Perder peso',
  manter = 'Manter peso',
  ganhoMassa = 'Ganho de massa'
}

export type Usuario = {
  email: string,
  senha: string,
  perfil?: {
    sexo: Sexo,
    idade: number,
    peso: number,
    altura: number,
    nivelAtvFisic: StatusAtvFisic,
    objetivo: Objetivo,
    TMB: number,
    IMC: number,
    macronutri: {
      proteina: number,
      carbo: number,
      gordura: number
    }
  }
}