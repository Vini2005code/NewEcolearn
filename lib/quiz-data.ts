export interface Question {
  id: number
  question: string
  image: string
  options: string[]
  correct: number
  xp: number
}

export interface QuizTopic {
  id: string
  name: string
  image: string
  description: string
  difficulty: "Iniciante" | "Intermediário"
  sponsorReady: boolean
  questions: Question[]
}

export const quizTopics: QuizTopic[] = [
  {
    id: "meio-ambiente",
    name: "Sustentabilidade",
    image: "/images/meio-ambiente.jpg",
    description: "Consumo consciente, clima, energia e preservação ambiental.",
    difficulty: "Iniciante",
    sponsorReady: true,
    questions: [
      {
        id: 1,
        question: "O que significa desenvolvimento sustentável?",
        image: "/images/quiz/desenvolvimento-sustentavel.jpg",
        options: [
          "Crescer sem considerar impactos ambientais",
          "Atender necessidades atuais sem comprometer as futuras",
          "Usar recursos naturais até acabarem",
          "Priorizar somente resultados financeiros",
        ],
        correct: 1,
        xp: 25,
      },
      {
        id: 2,
        question: "Qual atitude reduz o impacto do lixo nas cidades?",
        image: "/images/quiz/coleta-seletiva.jpg",
        options: [
          "Separar resíduos por tipo",
          "Misturar todo resíduo no mesmo saco",
          "Queimar lixo em áreas abertas",
          "Descartar óleo na pia",
        ],
        correct: 0,
        xp: 25,
      },
      {
        id: 3,
        question: "Qual fonte de energia é renovável?",
        image: "/images/quiz/energia-renovavel.jpg",
        options: ["Petróleo", "Carvão mineral", "Energia solar", "Gás natural"],
        correct: 2,
        xp: 30,
      },
      {
        id: 4,
        question: "Qual prática ajuda a economizar água?",
        image: "/images/quiz/economia-agua.jpg",
        options: [
          "Lavar calçadas com mangueira",
          "Reaproveitar água da chuva",
          "Deixar torneiras abertas",
          "Tomar banhos longos diariamente",
        ],
        correct: 1,
        xp: 25,
      },
      {
        id: 5,
        question: "O desmatamento afeta principalmente:",
        image: "/images/quiz/desmatamento.jpg",
        options: [
          "A biodiversidade e o equilíbrio climático",
          "Apenas a aparência da paisagem",
          "Somente áreas urbanas",
          "A velocidade da internet",
        ],
        correct: 0,
        xp: 35,
      },
    ],
  },
  {
    id: "animais",
    name: "Biodiversidade",
    image: "/images/animais.jpg",
    description: "Fauna brasileira, conservação e proteção de espécies.",
    difficulty: "Intermediário",
    sponsorReady: true,
    questions: [
      {
        id: 1,
        question: "Qual é o maior felino das Américas?",
        image: "/images/quiz/onca-pintada.jpg",
        options: ["Leão", "Tigre", "Onça-pintada", "Leopardo"],
        correct: 2,
        xp: 25,
      },
      {
        id: 2,
        question: "O que significa uma espécie estar em extinção?",
        image: "/images/quiz/animal-extincao.jpg",
        options: [
          "Ela está aumentando rapidamente",
          "Ela corre risco de desaparecer",
          "Ela vive apenas em aquários",
          "Ela não precisa de habitat",
        ],
        correct: 1,
        xp: 25,
      },
      {
        id: 3,
        question: "O que é biodiversidade?",
        image: "/images/quiz/biodiversidade.jpg",
        options: [
          "Variedade de vida em um ecossistema",
          "Apenas plantas de uma região",
          "Um tipo de poluição",
          "Uma lista de animais domésticos",
        ],
        correct: 0,
        xp: 30,
      },
      {
        id: 4,
        question: "Qual é uma causa comum da perda de espécies?",
        image: "/images/quiz/destruicao-habitat.jpg",
        options: [
          "Proteção de florestas",
          "Destruição do habitat natural",
          "Criação de corredores ecológicos",
          "Recuperação de nascentes",
        ],
        correct: 1,
        xp: 35,
      },
      {
        id: 5,
        question: "O tráfico de animais silvestres é:",
        image: "/images/quiz/trafico-animais.jpg",
        options: [
          "Um crime ambiental grave",
          "Uma prática educativa",
          "Uma ação sempre autorizada",
          "Um benefício para as espécies",
        ],
        correct: 0,
        xp: 35,
      },
    ],
  },
  {
    id: "dengue",
    name: "Saúde Ambiental",
    image: "/images/dengue.jpg",
    description: "Dengue, água parada, prevenção e cuidado comunitário.",
    difficulty: "Iniciante",
    sponsorReady: false,
    questions: [
      {
        id: 1,
        question: "Qual mosquito transmite a dengue?",
        image: "/images/quiz/aedes-aegypti.jpg",
        options: ["Anopheles", "Culex", "Aedes aegypti", "Musca domestica"],
        correct: 2,
        xp: 25,
      },
      {
        id: 2,
        question: "Qual é a principal forma de prevenção da dengue?",
        image: "/images/quiz/agua-parada.jpg",
        options: [
          "Eliminar água parada",
          "Tomar antibióticos preventivos",
          "Fechar todas as janelas para sempre",
          "Evitar beber água",
        ],
        correct: 0,
        xp: 30,
      },
      {
        id: 3,
        question: "Onde o mosquito costuma se reproduzir?",
        image: "/images/quiz/criadouro-mosquito.jpg",
        options: [
          "Em água limpa e parada",
          "Apenas em rios profundos",
          "Somente em água salgada",
          "Dentro de alimentos secos",
        ],
        correct: 0,
        xp: 25,
      },
      {
        id: 4,
        question: "Qual atitude comunitária ajuda no combate ao mosquito?",
        image: "/images/quiz/vaso-planta.jpg",
        options: [
          "Revisar vasos, calhas e recipientes",
          "Guardar pneus ao ar livre",
          "Acumular garrafas abertas",
          "Ignorar terrenos vazios",
        ],
        correct: 0,
        xp: 30,
      },
      {
        id: 5,
        question: "Ao suspeitar de dengue, o correto é:",
        image: "/images/quiz/medico-dengue.jpg",
        options: [
          "Procurar atendimento médico",
          "Fazer exercícios intensos",
          "Tomar qualquer remédio sem orientação",
          "Esperar sempre sem hidratação",
        ],
        correct: 0,
        xp: 35,
      },
    ],
  },
]

export const getTopicById = (topicId: string) =>
  quizTopics.find((topic) => topic.id === topicId)

export const calculateScore = (correctAnswers: number, totalQuestions: number): number =>
  Math.round((correctAnswers / totalQuestions) * 100)

export const calculateXp = (topic: QuizTopic, answeredCorrectly: number[]): number =>
  answeredCorrectly.reduce((total, questionIndex) => total + topic.questions[questionIndex].xp, 0)
