export interface Question {
  id: number
  question: string
  options: string[]
  correct: number
}

export interface QuizTopic {
  id: string
  name: string
  icon: string
  image: string
  description: string
  questions: Question[]
}

export const quizTopics: QuizTopic[] = [
  {
    id: "meio-ambiente",
    name: "Meio Ambiente",
    icon: "🌿",
    image: "/images/meio-ambiente.jpg",
    description: "Teste seus conhecimentos sobre sustentabilidade e preservação ambiental",
    questions: [
      {
        id: 1,
        question: "O que significa desenvolvimento sustentável?",
        options: [
          "Crescer economicamente sem se preocupar com a natureza",
          "Usar recursos naturais até acabarem",
          "Atender às necessidades atuais sem comprometer as futuras",
          "Priorizar apenas o lucro"
        ],
        correct: 2
      },
      {
        id: 2,
        question: "Qual é o principal impacto do descarte incorreto de lixo?",
        options: [
          "Apenas sujeira visual",
          "Poluição do solo, da água e do ar",
          "Aumento da reciclagem",
          "Melhora da saúde pública"
        ],
        correct: 1
      },
      {
        id: 3,
        question: "Qual destes materiais demora mais tempo para se decompor?",
        options: [
          "Papel",
          "Restos de comida",
          "Plástico",
          "Folhas secas"
        ],
        correct: 2
      },
      {
        id: 4,
        question: "O que é efeito estufa?",
        options: [
          "Fenômeno que resfria o planeta",
          "Processo natural que mantém a Terra aquecida",
          "Tipo de poluição sonora",
          "Apenas consequência da indústria"
        ],
        correct: 1
      },
      {
        id: 5,
        question: "Qual atitude ajuda a economizar água?",
        options: [
          "Lavar calçada com mangueira",
          "Deixar torneira aberta ao escovar os dentes",
          "Reaproveitar água da chuva",
          "Tomar banhos longos"
        ],
        correct: 2
      },
      {
        id: 6,
        question: "O desmatamento causa principalmente:",
        options: [
          "Aumento da biodiversidade",
          "Melhora do clima",
          "Perda de espécies e desequilíbrio ambiental",
          "Redução da poluição"
        ],
        correct: 2
      },
      {
        id: 7,
        question: "O que é coleta seletiva?",
        options: [
          "Jogar todo lixo no mesmo lugar",
          "Separar resíduos por tipo",
          "Queimar resíduos",
          "Enterrar lixo"
        ],
        correct: 1
      },
      {
        id: 8,
        question: "Qual é uma fonte de energia renovável?",
        options: [
          "Petróleo",
          "Carvão mineral",
          "Energia solar",
          "Gás natural"
        ],
        correct: 2
      },
      {
        id: 9,
        question: "O que são resíduos orgânicos?",
        options: [
          "Plástico e vidro",
          "Papel e metal",
          "Restos de alimentos e folhas",
          "Pilhas e baterias"
        ],
        correct: 2
      },
      {
        id: 10,
        question: "Qual ação individual ajuda no combate às mudanças climáticas?",
        options: [
          "Usar carro para tudo",
          "Evitar reciclar",
          "Economizar energia elétrica",
          "Queimar lixo"
        ],
        correct: 2
      }
    ]
  },
  {
    id: "animais",
    name: "Animais",
    icon: "🦁",
    image: "/images/animais.jpg",
    description: "Aprenda sobre a fauna brasileira e conservação animal",
    questions: [
      {
        id: 1,
        question: "Qual é o maior felino das Américas?",
        options: [
          "Leão",
          "Tigre",
          "Onça-pintada",
          "Leopardo"
        ],
        correct: 2
      },
      {
        id: 2,
        question: "O que significa um animal estar em extinção?",
        options: [
          "Está aumentando em número",
          "Corre risco de desaparecer completamente",
          "Vive apenas em zoológicos",
          "É muito comum na natureza"
        ],
        correct: 1
      },
      {
        id: 3,
        question: "Qual destes animais é endêmico do Brasil?",
        options: [
          "Elefante africano",
          "Mico-leão-dourado",
          "Panda gigante",
          "Canguru"
        ],
        correct: 1
      },
      {
        id: 4,
        question: "O que é biodiversidade?",
        options: [
          "Apenas plantas de uma região",
          "Variedade de vida em um ecossistema",
          "Animais de zoológico",
          "Poluição ambiental"
        ],
        correct: 1
      },
      {
        id: 5,
        question: "Qual é a principal causa da extinção de espécies?",
        options: [
          "Reprodução excessiva",
          "Destruição do habitat natural",
          "Excesso de alimento",
          "Clima favorável"
        ],
        correct: 1
      },
      {
        id: 6,
        question: "O que são animais silvestres?",
        options: [
          "Animais domésticos",
          "Animais que vivem livremente na natureza",
          "Animais de fazenda",
          "Animais de estimação"
        ],
        correct: 1
      },
      {
        id: 7,
        question: "Qual bioma brasileiro abriga a maior biodiversidade?",
        options: [
          "Caatinga",
          "Pampa",
          "Amazônia",
          "Pantanal"
        ],
        correct: 2
      },
      {
        id: 8,
        question: "O tráfico de animais silvestres é:",
        options: [
          "Legal e incentivado",
          "Crime ambiental grave",
          "Permitido com autorização",
          "Benéfico para as espécies"
        ],
        correct: 1
      },
      {
        id: 9,
        question: "Qual ave é símbolo nacional do Brasil?",
        options: [
          "Águia",
          "Arara-azul",
          "Sabiá-laranjeira",
          "Tucano"
        ],
        correct: 2
      },
      {
        id: 10,
        question: "O que são Unidades de Conservação?",
        options: [
          "Fazendas de criação",
          "Áreas protegidas por lei para preservação",
          "Zoológicos privados",
          "Centros de pesquisa"
        ],
        correct: 1
      }
    ]
  },
  {
    id: "dengue",
    name: "Dengue",
    icon: "🦟",
    image: "/images/dengue.jpg",
    description: "Informações importantes sobre prevenção e combate à dengue",
    questions: [
      {
        id: 1,
        question: "Qual mosquito transmite a dengue?",
        options: [
          "Anopheles",
          "Culex",
          "Aedes aegypti",
          "Musca domestica"
        ],
        correct: 2
      },
      {
        id: 2,
        question: "Qual é a principal forma de prevenção da dengue?",
        options: [
          "Tomar remédios preventivos",
          "Eliminar água parada",
          "Usar repelente 24 horas",
          "Fechar todas as janelas"
        ],
        correct: 1
      },
      {
        id: 3,
        question: "Em quanto tempo o ovo do Aedes aegypti pode eclodir após contato com água?",
        options: [
          "1 hora",
          "30 minutos a 48 horas",
          "1 semana",
          "1 mês"
        ],
        correct: 1
      },
      {
        id: 4,
        question: "Qual sintoma NÃO é comum na dengue?",
        options: [
          "Febre alta",
          "Dores no corpo",
          "Tosse persistente",
          "Manchas vermelhas"
        ],
        correct: 2
      },
      {
        id: 5,
        question: "Onde o mosquito da dengue costuma se reproduzir?",
        options: [
          "Em rios e lagos",
          "Em água limpa e parada",
          "Em água salgada",
          "Em solo úmido"
        ],
        correct: 1
      },
      {
        id: 6,
        question: "Qual objeto doméstico pode ser criadouro do mosquito?",
        options: [
          "Geladeira",
          "Prato de vaso de planta com água",
          "Fogão",
          "Sofá"
        ],
        correct: 1
      },
      {
        id: 7,
        question: "O que fazer ao suspeitar de dengue?",
        options: [
          "Tomar antibióticos",
          "Procurar atendimento médico",
          "Esperar passar sozinho",
          "Fazer exercícios intensos"
        ],
        correct: 1
      },
      {
        id: 8,
        question: "Além da dengue, o Aedes aegypti também transmite:",
        options: [
          "Gripe e resfriado",
          "Zika e chikungunya",
          "COVID-19",
          "Tuberculose"
        ],
        correct: 1
      },
      {
        id: 9,
        question: "Qual é o período do dia em que o Aedes aegypti mais pica?",
        options: [
          "Apenas à noite",
          "Apenas de madrugada",
          "Início da manhã e final da tarde",
          "Apenas ao meio-dia"
        ],
        correct: 2
      },
      {
        id: 10,
        question: "A dengue hemorrágica é:",
        options: [
          "Uma forma leve da doença",
          "Uma forma grave que pode ser fatal",
          "Contagiosa entre pessoas",
          "Causada por outro mosquito"
        ],
        correct: 1
      }
    ]
  }
]

export const calculateScore = (correctAnswers: number, totalQuestions: number): number => {
  const baseScore = 100
  const scorePerQuestion = baseScore / totalQuestions
  return Math.round(correctAnswers * scorePerQuestion * 1.5)
}
