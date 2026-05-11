export interface Question {
  id: number
  question: string
  image: string
  options: string[]
  correct: number
  explanation: string
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
        correct: 2,
        explanation: "Desenvolvimento sustentável é o conceito que equilibra crescimento econômico e social sem esgotar os recursos naturais, garantindo que gerações futuras também possam atender suas necessidades."
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
        correct: 1,
        explanation: "O descarte incorreto contamina o solo e lençóis freáticos, libera gases tóxicos e causa doenças, afetando ecossistemas inteiros muito além da simples sujeira visual."
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
        correct: 2,
        explanation: "O plástico pode levar de 100 a 400 anos para se decompor, enquanto restos de comida levam semanas e folhas secas alguns meses. Por isso, reduzir o uso de plástico é essencial."
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
        correct: 1,
        explanation: "O efeito estufa é um processo natural em que gases atmosféricos retêm calor solar, mantendo a Terra habitável. O problema é seu intensificação pelo excesso de CO₂ gerado pela atividade humana."
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
        correct: 2,
        explanation: "Reaproveitar água da chuva para regar plantas ou limpar calçadas pode economizar centenas de litros por mês, além de reduzir o consumo da rede de abastecimento."
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
        correct: 2,
        explanation: "O desmatamento destrói habitats, extingue espécies, aumenta as emissões de CO₂ e causa erosão do solo e mudanças nos padrões climáticos locais e globais."
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
        correct: 1,
        explanation: "A coleta seletiva consiste em separar os resíduos por tipo (papel, plástico, vidro, metal e orgânico), facilitando a reciclagem e reduzindo o volume enviado a aterros sanitários."
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
        correct: 2,
        explanation: "A energia solar é renovável porque provém do sol, uma fonte inesgotável em escala humana. Petróleo, carvão e gás natural são fósseis que levam milhões de anos para se formar."
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
        correct: 2,
        explanation: "Resíduos orgânicos são de origem biológica, como restos de alimentos e podas. Eles podem ser compostados e transformados em adubo, reduzindo o lixo enviado a aterros."
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
        correct: 2,
        explanation: "Economizar energia elétrica reduz a demanda sobre usinas termelétricas, que emitem gases do efeito estufa. Pequenas ações individuais têm impacto coletivo significativo."
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
        correct: 2,
        explanation: "A onça-pintada (Panthera onca) é o maior felino das Américas e o terceiro maior do mundo. É símbolo da fauna brasileira e encontra-se ameaçada de extinção devido ao desmatamento."
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
        correct: 1,
        explanation: "Um animal em extinção tem sua população tão reduzida que corre risco de desaparecer da natureza para sempre. A IUCN classifica espécies por categorias de risco, de 'vulnerável' a 'extinto'."
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
        correct: 1,
        explanation: "O mico-leão-dourado é endêmico da Mata Atlântica brasileira, ou seja, existe somente aqui. Graças a programas de conservação, sua população cresceu de cerca de 200 para mais de 3.000 indivíduos."
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
        correct: 1,
        explanation: "Biodiversidade é a variedade de formas de vida num ecossistema: plantas, animais, fungos e microrganismos. O Brasil é o país com maior biodiversidade do mundo."
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
        correct: 1,
        explanation: "A destruição do habitat — principalmente o desmatamento para agricultura e urbanização — é responsável por mais de 70% das extinções registradas atualmente em todo o mundo."
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
        correct: 1,
        explanation: "Animais silvestres são aqueles que não foram domesticados e vivem em seu ambiente natural. No Brasil, sua captura e comercialização são crimes previstos na Lei de Crimes Ambientais."
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
        correct: 2,
        explanation: "A Amazônia abriga cerca de 10% de todas as espécies do planeta, incluindo mais de 40.000 espécies de plantas, 1.300 de aves e 3.000 de peixes, sendo o maior bioma tropical do mundo."
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
        correct: 1,
        explanation: "O tráfico de animais silvestres é o terceiro maior crime organizado do mundo, movimentando bilhões de dólares anualmente. No Brasil, é punido com reclusão de 6 meses a 1 ano e multa."
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
        correct: 2,
        explanation: "O sabiá-laranjeira (Turdus rufiventris) é o pássaro nacional do Brasil, consagrado pelo poema 'Canção do Exílio' de Gonçalves Dias. É encontrado em todo o território nacional."
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
        correct: 1,
        explanation: "Unidades de Conservação (UCs) são áreas territorialmente delimitadas e protegidas por lei com o objetivo de preservar a biodiversidade, como parques nacionais e reservas biológicas."
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
        correct: 2,
        explanation: "O Aedes aegypti é o principal vetor da dengue. É reconhecido pelas listras brancas no corpo escuro. Diferente de outros mosquitos, pica principalmente durante o dia."
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
        correct: 1,
        explanation: "Eliminar focos de água parada é a forma mais eficaz de prevenir a dengue, pois interrompe o ciclo de reprodução do mosquito antes que ele se torne adulto e transmissor da doença."
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
        correct: 1,
        explanation: "Os ovos do Aedes aegypti são resistentes à seca e podem permanecer viáveis por até um ano. Ao entrar em contato com água, eclodem rapidamente, em 30 minutos a 48 horas."
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
        correct: 2,
        explanation: "Tosse persistente é sintoma de infecções respiratórias como gripe ou COVID-19, não da dengue. Os sintomas típicos da dengue incluem febre alta, dores intensas no corpo, dor atrás dos olhos e manchas vermelhas."
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
        correct: 1,
        explanation: "O Aedes aegypti prefere depositar seus ovos em água limpa e parada em recipientes pequenos. Diferente de outros mosquitos, não se reproduz em esgotos ou águas sujas."
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
        correct: 1,
        explanation: "O prato de vaso de planta acumula água parada e é um dos principais criadouros do Aedes aegypti dentro de casa. A solução é usar areia no prato ou esvaziar semanalmente."
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
        correct: 1,
        explanation: "Ao suspeitar de dengue, procure atendimento médico imediatamente. Antibióticos não têm efeito em vírus. O médico avaliará a necessidade de exames e orientará sobre hidratação e repouso."
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
        correct: 1,
        explanation: "O Aedes aegypti é vetor de múltiplas arboviroses: dengue, Zika e chikungunya. O vírus Zika durante a gravidez pode causar microcefalia em bebês, tornando o controle do mosquito ainda mais urgente."
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
        correct: 2,
        explanation: "O Aedes aegypti é um mosquito diurno, com maior atividade no início da manhã (6h–8h) e no final da tarde (17h–19h). Use repelente nesses horários para maior proteção."
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
        correct: 1,
        explanation: "A dengue hemorrágica é uma forma grave da doença caracterizada por sangramentos, queda na pressão arterial e risco de choque. Pode ser fatal se não tratada rapidamente em unidade hospitalar."
      }
    ]
  }
]

export const calculateScore = (correctAnswers: number, totalQuestions: number): number => {
  const baseScore = 100
  const scorePerQuestion = baseScore / totalQuestions
  return Math.round(correctAnswers * scorePerQuestion * 1.5)
}
