export interface Question {
  id: number
  question: string
  image: string
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
        image: "/images/quiz/desenvolvimento-sustentavel.jpg",
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
        image: "/images/quiz/descarte-lixo.jpg",
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
        image: "/images/quiz/plastico-decomposicao.jpg",
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
        image: "/images/quiz/efeito-estufa.jpg",
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
        image: "/images/quiz/economia-agua.jpg",
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
        image: "/images/quiz/desmatamento.jpg",
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
        image: "/images/quiz/coleta-seletiva.jpg",
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
        image: "/images/quiz/energia-renovavel.jpg",
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
        image: "/images/quiz/residuos-organicos.jpg",
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
        image: "/images/quiz/mudancas-climaticas.jpg",
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
        image: "/images/quiz/onca-pintada.jpg",
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
        image: "/images/quiz/animal-extincao.jpg",
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
        image: "/images/quiz/mico-leao.jpg",
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
        image: "/images/quiz/biodiversidade.jpg",
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
        image: "/images/quiz/destruicao-habitat.jpg",
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
        image: "/images/quiz/animais-silvestres.jpg",
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
        image: "/images/quiz/amazonia.jpg",
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
        image: "/images/quiz/trafico-animais.jpg",
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
        image: "/images/quiz/sabia-laranjeira.jpg",
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
        image: "/images/quiz/unidades-conservacao.jpg",
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
        image: "/images/quiz/aedes-aegypti.jpg",
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
        image: "/images/quiz/agua-parada.jpg",
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
        image: "/images/quiz/ovo-mosquito.jpg",
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
        image: "/images/quiz/sintomas-dengue.jpg",
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
        image: "/images/quiz/criadouro-mosquito.jpg",
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
        image: "/images/quiz/vaso-planta.jpg",
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
        image: "/images/quiz/medico-dengue.jpg",
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
        image: "/images/quiz/zika-chikungunya.jpg",
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
        image: "/images/quiz/horario-pico.jpg",
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
        image: "/images/quiz/dengue-hemorragica.jpg",
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
