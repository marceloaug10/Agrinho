/**
 * EcoAgro — Diagnóstico de Sustentabilidade Rural
 * js/script.js
 * Concurso Agrinho 2026 | Subcategoria 3 — Ensino Médio
 *
 * Organização:
 *  1. Dados (perguntas, classificações, conteúdo de resultado)
 *  2. Estado global da aplicação
 *  3. Utilitários
 *  4. Navegação entre telas
 *  5. Dark Mode
 *  6. Questionário
 *  7. Resultado
 *  8. Educação Ambiental
 *  9. Histórico (localStorage)
 * 10. Inicialização
 */

/* ================================================================
   1. DADOS — PERGUNTAS DO QUESTIONÁRIO
   ================================================================ */

/**
 * Cada pergunta possui:
 *  - id         : identificador único
 *  - category   : categoria temática (usada para cor e breakdown)
 *  - categoryLabel : texto da etiqueta exibida
 *  - categoryClass : classe CSS da etiqueta
 *  - text       : enunciado da pergunta
 *  - options    : array de opções, cada uma com { text, score, feedback }
 *                 score: pontos concedidos (0–10)
 *                 feedback: dica exibida após responder
 */
const QUESTIONS = [
  {
    id: 1,
    category: "water",
    categoryLabel: "💧 Água",
    categoryClass: "cat-water",
    text: "Como é feita a irrigação na sua propriedade ou na propriedade que você conhece?",
    options: [
      {
        text: "Gotejamento ou microaspersão — água direto na raiz, sem desperdício",
        score: 10,
        feedback: "Excelente! O gotejamento pode economizar até 50% da água em relação à irrigação por inundação."
      },
      {
        text: "Aspersão convencional com horários controlados (manhã ou tarde)",
        score: 7,
        feedback: "Boa prática! Irrigar nos horários mais frescos reduz a evaporação. Considere migrar para gotejamento."
      },
      {
        text: "Aspersão sem horário definido, conforme necessidade",
        score: 4,
        feedback: "Há espaço para melhorar. Definir horários e usar sensores de umidade reduz muito o desperdício."
      },
      {
        text: "Inundação ou sulcos — água corre pelo terreno livremente",
        score: 1,
        feedback: "A irrigação por inundação desperdiça até 60% da água. Alternativas como gotejamento são muito mais eficientes."
      }
    ]
  },
  {
    id: 2,
    category: "energy",
    categoryLabel: "⚡ Energia",
    categoryClass: "cat-energy",
    text: "Qual a principal fonte de energia utilizada na propriedade?",
    options: [
      {
        text: "Energia solar fotovoltaica e/ou eólica — 100% renovável",
        score: 10,
        feedback: "Parabéns! Energia limpa é um dos pilares da sustentabilidade rural. O Brasil tem enorme potencial solar!"
      },
      {
        text: "Energia elétrica da rede, mas com painéis solares complementando",
        score: 7,
        feedback: "Ótima iniciativa! A combinação rede + solar já representa uma redução significativa na pegada de carbono."
      },
      {
        text: "Exclusivamente energia elétrica da rede pública",
        score: 4,
        feedback: "A rede elétrica brasileira tem boa participação renovável, mas instalar energia solar pode trazer autonomia e economia."
      },
      {
        text: "Principalmente gerador a diesel ou gasolina",
        score: 0,
        feedback: "Geradores a combustível têm alto custo e impacto ambiental. Bombas solares e painéis são investimentos que se pagam rapidamente."
      }
    ]
  },
  {
    id: 3,
    category: "water",
    categoryLabel: "💧 Água",
    categoryClass: "cat-water",
    text: "Como é feito o reaproveitamento ou armazenamento de água na propriedade?",
    options: [
      {
        text: "Há cisterna, barragem ou reservatório para captar água da chuva",
        score: 10,
        feedback: "Ótimo! Cisternas e barragens garantem água nos períodos de seca e reduzem a dependência de fontes externas."
      },
      {
        text: "Existe algum reaproveitamento parcial (ex.: água de lavagem para irrigação)",
        score: 6,
        feedback: "Bom começo! Ampliar o reaproveitamento para toda a propriedade pode gerar grande economia."
      },
      {
        text: "Usa principalmente poço artesiano ou nascente sem reaproveitamento",
        score: 3,
        feedback: "Nascentes e poços são recursos valiosos. Combiná-los com captação pluvial é uma estratégia inteligente."
      },
      {
        text: "Não há reaproveitamento — água é usada e descartada",
        score: 0,
        feedback: "A água é um recurso escasso. Implementar cisternas simples já representa uma grande mudança de impacto."
      }
    ]
  },
  {
    id: 4,
    category: "land",
    categoryLabel: "🌱 Solo e Vegetação",
    categoryClass: "cat-land",
    text: "Como são tratadas as áreas de vegetação nativa e matas ciliares na propriedade?",
    options: [
      {
        text: "Preservadas integralmente; há reflorestamento ativo de áreas degradadas",
        score: 10,
        feedback: "Excelente! Preservar e recuperar a vegetação nativa protege mananciais, a fauna e garante a sustentabilidade a longo prazo."
      },
      {
        text: "Preservadas de acordo com o exigido pelo Código Florestal (APP + Reserva Legal)",
        score: 7,
        feedback: "Parabéns por cumprir a legislação! Ir além do mínimo legal traz benefícios ainda maiores para a propriedade."
      },
      {
        text: "Parte preservada, parte utilizada para cultivo ou pastagem",
        score: 3,
        feedback: "É importante regularizar a situação no CAR e recuperar as APPs. Isso protege a água e aumenta a produtividade."
      },
      {
        text: "Não há preocupação com preservação de áreas verdes",
        score: 0,
        feedback: "A legislação exige preservação de matas ciliares e reserva legal. Além disso, árvores nativas trazem benefícios produtivos reais."
      }
    ]
  },
  {
    id: 5,
    category: "waste",
    categoryLabel: "♻️ Resíduos",
    categoryClass: "cat-waste",
    text: "Como são descartados os resíduos gerados na propriedade (embalagens, orgânicos, lixo)?",
    options: [
      {
        text: "Separação completa: orgânicos para compostagem, recicláveis para coleta, embalagens de agrotóxico devolvidas",
        score: 10,
        feedback: "Excelente gestão! O descarte correto protege o solo, a água e a saúde de toda a comunidade rural."
      },
      {
        text: "Há separação básica e destinação correta, mas sem compostagem",
        score: 6,
        feedback: "Bom! Implantar compostagem é o próximo passo — reduz lixo e gera adubo natural de alta qualidade."
      },
      {
        text: "Maior parte vai para aterro ou coleta municipal, sem separação",
        score: 3,
        feedback: "Separar resíduos é simples e traz grandes benefícios. Comece pela compostagem dos resíduos de cozinha e roça."
      },
      {
        text: "Resíduos são queimados ou jogados em áreas da propriedade",
        score: 0,
        feedback: "Queimar resíduos é crime ambiental e prejudica a saúde. Existem alternativas simples e gratuitas para o descarte correto."
      }
    ]
  },
  {
    id: 6,
    category: "land",
    categoryLabel: "🌱 Solo e Vegetação",
    categoryClass: "cat-land",
    text: "Quais técnicas de manejo do solo são adotadas para evitar erosão e manter a fertilidade?",
    options: [
      {
        text: "Plantio direto, rotação de culturas e adubação orgânica/verde",
        score: 10,
        feedback: "Excelente! Essas técnicas preservam a microbiota do solo, retêm água e aumentam a produtividade de forma sustentável."
      },
      {
        text: "Terraceamento e curvas de nível para controle de erosão",
        score: 7,
        feedback: "Ótimo! O terraceamento é fundamental em áreas inclinadas. Complementar com plantio direto potencializa os resultados."
      },
      {
        text: "Uso de fertilizantes químicos com algum cuidado, mas sem técnicas conservacionistas",
        score: 3,
        feedback: "Fertilizantes químicos sem manejo conservacionista degradam o solo a longo prazo. O plantio direto é uma alternativa viável."
      },
      {
        text: "Não há técnicas especiais de manejo de solo",
        score: 0,
        feedback: "O solo é o maior patrimônio de uma propriedade rural. Técnicas simples como cobertura morta já fazem grande diferença."
      }
    ]
  },
  {
    id: 7,
    category: "bio",
    categoryLabel: "🌿 Biodiversidade",
    categoryClass: "cat-bio",
    text: "Como a propriedade lida com o controle de pragas e doenças das lavouras?",
    options: [
      {
        text: "Controle biológico, armadilhas e métodos integrados — mínimo de agrotóxicos",
        score: 10,
        feedback: "Parabéns! O Manejo Integrado de Pragas (MIP) é a abordagem mais sustentável e está ganhando espaço no mercado."
      },
      {
        text: "Uso de agrotóxicos seletivos e de baixa toxicidade, seguindo receituário agronômico",
        score: 6,
        feedback: "Seguir o receituário é essencial para a segurança. Migrar gradualmente para o controle biológico é o próximo passo."
      },
      {
        text: "Aplicação de agrotóxicos conforme calendário, mesmo sem necessidade comprovada",
        score: 2,
        feedback: "A aplicação preventiva sem monitoramento aumenta custos, resiste a pragas e contamina o ambiente. O MIP é mais eficaz."
      },
      {
        text: "Aplicação intensiva de agrotóxicos sem controle técnico",
        score: 0,
        feedback: "O uso indiscriminado de agrotóxicos é prejudicial à saúde humana, fauna e ao solo. Consulte um agrônomo para alternativas."
      }
    ]
  },
  {
    id: 8,
    category: "energy",
    categoryLabel: "⚡ Energia",
    categoryClass: "cat-energy",
    text: "Existem práticas para reduzir o desperdício de energia e insumos na propriedade?",
    options: [
      {
        text: "Sim — monitoramento ativo de consumo, equipamentos eficientes e processos otimizados",
        score: 10,
        feedback: "Excelente! A eficiência energética reduz custos e a pegada de carbono da propriedade."
      },
      {
        text: "Algumas práticas básicas, como desligar equipamentos ociosos",
        score: 6,
        feedback: "Bom começo! Mapear os maiores consumos e implementar melhorias graduais pode gerar economias expressivas."
      },
      {
        text: "Pouca atenção ao consumo — equipamentos são usados conforme necessidade sem controle",
        score: 3,
        feedback: "Um simples monitoramento mensal já revela oportunidades de economia. Comece pelos maiores consumidores."
      },
      {
        text: "Não há nenhuma preocupação com desperdício de energia ou insumos",
        score: 0,
        feedback: "Reduzir desperdícios é o caminho mais rápido para aumentar a rentabilidade e diminuir o impacto ambiental."
      }
    ]
  },
  {
    id: 9,
    category: "bio",
    categoryLabel: "🌿 Biodiversidade",
    categoryClass: "cat-bio",
    text: "A propriedade realiza alguma prática de integração com a natureza ou biodiversidade?",
    options: [
      {
        text: "Sim — sistema agroflorestal, iLPF ou corredores ecológicos implantados",
        score: 10,
        feedback: "Incrível! Sistemas integrados são o futuro do agronegócio sustentável e já demonstram ganhos de produtividade."
      },
      {
        text: "Há plantio de árvores nativas nas bordas e cercas vivas",
        score: 7,
        feedback: "Ótimo! Cercas vivas e árvores nativas oferecem sombra, atraem polinizadores e protegem contra erosão."
      },
      {
        text: "Há alguma preocupação, mas sem implementação formal",
        score: 3,
        feedback: "Dar o primeiro passo formal, como um cadastro no CAR e um plano de recuperação, já representa grande avanço."
      },
      {
        text: "Não há integração com a biodiversidade — foco exclusivo na produção",
        score: 0,
        feedback: "A biodiversidade é aliada da produção. Polinizadores, solo vivo e água limpa dependem de um ecossistema equilibrado."
      }
    ]
  },
  {
    id: 10,
    category: "water",
    categoryLabel: "💧 Água",
    categoryClass: "cat-water",
    text: "Como a propriedade monitora e protege a qualidade da água usada na produção e consumo?",
    options: [
      {
        text: "Análises regulares da água, proteção de nascentes e uso de buffer vegetativo nas margens",
        score: 10,
        feedback: "Excelente! Proteger a qualidade da água é fundamental para a saúde humana, animal e para o meio ambiente."
      },
      {
        text: "Há proteção básica das nascentes e evita-se jogar resíduos próximos a cursos d'água",
        score: 6,
        feedback: "Bom! Incluir análises periódicas da água e ampliar a mata ciliar são passos importantes para garantir a qualidade."
      },
      {
        text: "A água é usada sem monitoramento, mas há cuidados gerais",
        score: 3,
        feedback: "O monitoramento da água é acessível e vital. Contaminações silenciosas podem afetar a produção e a saúde da família."
      },
      {
        text: "Não há monitoramento nem proteção das fontes de água",
        score: 0,
        feedback: "A água contaminada é um risco grave. Proteger nascentes e fazer análises regulares é simples, barato e salva vidas."
      }
    ]
  }
];

/* ================================================================
   2. CLASSIFICAÇÕES DE RESULTADO
   ================================================================ */

/**
 * Cada classificação define a mensagem, cor e sugestões exibidas
 * no resultado. Limites: 0–30, 31–60, 61–80, 81–100.
 */
const CLASSIFICATIONS = [
  {
    minScore: 81,
    maxScore: 100,
    name: "Agro Sustentável",
    emoji: "🌟",
    badgeClass: "badge-best",
    cardClass: "class-best",
    circleColor: "#1a5a8a",
    message: "Sua propriedade é referência em sustentabilidade!",
    description: "Parabéns! Você demonstra práticas avançadas de sustentabilidade rural. Sua propriedade está no caminho certo para um agronegócio resiliente, lucrativo e ambientalmente responsável.",
    strengths: [
      "Gestão hídrica eficiente com reaproveitamento de água",
      "Uso expressivo de energia renovável",
      "Manejo sustentável do solo e da biodiversidade",
      "Descarte correto de resíduos e embalagens",
      "Preservação de áreas de vegetação nativa"
    ],
    improvements: [
      "Continue monitorando e aprimorando os indicadores de desempenho",
      "Compartilhe suas práticas com outros produtores da região",
      "Considere certificações sustentáveis para agregar valor"
    ],
    suggestions: [
      "Busque certificações como Rainforest Alliance ou LEED rural",
      "Documente suas práticas para criar um manual de boas práticas",
      "Explore mercados premium que valorizam produtos sustentáveis",
      "Torne-se uma propriedade de referência para visitas técnicas"
    ]
  },
  {
    minScore: 61,
    maxScore: 80,
    name: "Sustentável",
    emoji: "🌿",
    badgeClass: "badge-good",
    cardClass: "class-good",
    circleColor: "#2d7a3a",
    message: "Você está no caminho certo rumo à sustentabilidade!",
    description: "Sua propriedade já adota boas práticas sustentáveis em várias frentes. Com alguns ajustes e investimentos pontuais, você pode alcançar a excelência ambiental e produtiva.",
    strengths: [
      "Demonstra consciência ambiental nas práticas diárias",
      "Algumas áreas apresentam ótimas iniciativas sustentáveis",
      "Há comprometimento com a preservação dos recursos naturais"
    ],
    improvements: [
      "Ampliar o uso de energia renovável (solar ou eólica)",
      "Implementar sistemas de captação e reaproveitamento de água",
      "Fortalecer o manejo integrado de pragas"
    ],
    suggestions: [
      "Instale um sistema de cisterna ou barragem para captação pluvial",
      "Faça uma análise de viabilidade para energia solar fotovoltaica",
      "Regularize o cadastro da propriedade no CAR (Cadastro Ambiental Rural)",
      "Inicie um programa de compostagem para os resíduos orgânicos"
    ]
  },
  {
    minScore: 31,
    maxScore: 60,
    name: "Em Desenvolvimento",
    emoji: "🌱",
    badgeClass: "badge-warning",
    cardClass: "class-warning",
    circleColor: "#c87e10",
    message: "Há espaço importante para crescer em sustentabilidade.",
    description: "Sua propriedade dá primeiros passos em direção à sustentabilidade, mas ainda há muitas oportunidades de melhoria. Pequenas mudanças graduais podem gerar grande impacto ambiental e econômico.",
    strengths: [
      "Há algum nível de consciência sobre a importância da sustentabilidade",
      "Existe potencial para rápida evolução com orientação adequada"
    ],
    improvements: [
      "Implementar técnicas básicas de conservação do solo",
      "Iniciar o reaproveitamento de água na produção",
      "Regularizar o descarte de resíduos, especialmente embalagens de agrotóxicos",
      "Preservar e recuperar matas ciliares e áreas de APP"
    ],
    suggestions: [
      "Procure a Emater ou Senar da sua região para assistência técnica gratuita",
      "Comece pela compostagem — baixo custo e alto retorno",
      "Instale pelo menos uma cisterna calçadão para iniciar a captação pluvial",
      "Cadastre a propriedade no CAR e regularize a situação ambiental",
      "Participe de grupos de produtores sustentáveis da sua região"
    ]
  },
  {
    minScore: 0,
    maxScore: 30,
    name: "Impacto Alto",
    emoji: "⚠️",
    badgeClass: "badge-danger",
    cardClass: "class-danger",
    circleColor: "#b84040",
    message: "A propriedade precisa urgentemente adotar práticas sustentáveis.",
    description: "O diagnóstico indica práticas com alto impacto ambiental. Adotar medidas sustentáveis não é apenas uma questão ambiental — é uma necessidade econômica e legal que protege o futuro da propriedade.",
    strengths: [
      "Ao responder este diagnóstico, você já demonstrou interesse em melhorar",
      "Qualquer mudança positiva a partir de agora terá grande impacto"
    ],
    improvements: [
      "Cessar imediatamente a queima de resíduos (é crime ambiental)",
      "Revisar o uso de agrotóxicos e buscar orientação técnica",
      "Iniciar a preservação das matas ciliares e nascentes",
      "Implantar manejo básico do solo para evitar erosão",
      "Criar sistema mínimo de descarte correto de resíduos"
    ],
    suggestions: [
      "Entre em contato com a Emater ou Senar para assistência técnica gratuita",
      "Regularize a propriedade no CAR o mais breve possível",
      "Procure o sindicato rural da sua região para acesso a programas de apoio",
      "Comece com mudanças simples: compostagem, proteção de nascentes, separação do lixo",
      "Consulte programas de financiamento para agricultores que adotam práticas sustentáveis"
    ]
  }
];

/* ================================================================
   3. ESTADO GLOBAL DA APLICAÇÃO
   ================================================================ */

/**
 * `state` centraliza todos os dados mutáveis da sessão.
 * Nenhuma variável global solta além deste objeto.
 */
const state = {
  currentScreen: "home",   // tela ativa
  currentQuestion: 0,       // índice da pergunta atual (0–9)
  answers: [],              // pontuações de cada resposta [10 posições]
  answerIndexes: [],        // índice da opção escolhida por pergunta
  answered: [],             // booleano: pergunta i foi respondida?
  totalScore: 0,            // pontuação final calculada
  darkMode: false,          // estado do dark mode
  quizComplete: false       // se o questionário foi finalizado
};

/* ================================================================
   4. UTILITÁRIOS
   ================================================================ */

/**
 * Formata a data atual em português (ex.: "2 de junho de 2026 às 14:30")
 * @returns {string}
 */
function formatDate() {
  const now = new Date();
  const date = now.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const time = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  return `${date} às ${time}`;
}

/**
 * Exibe uma notificação toast temporária na tela
 * @param {string} message - Texto a exibir
 * @param {number} duration - Duração em ms (padrão 2800)
 */
function showToast(message, duration = 2800) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), duration);
}

/**
 * Calcula a pontuação total somando os scores de cada resposta.
 * O máximo possível é 10 * 10 = 100 pontos.
 * @returns {number} pontuação de 0 a 100
 */
function calcTotalScore() {
  const sum = state.answers.reduce((acc, val) => acc + (val || 0), 0);
  // Normaliza para 0–100 (máximo teórico = 100)
  return Math.round(sum);
}

/**
 * Retorna o objeto de classificação correspondente à pontuação
 * @param {number} score
 * @returns {object} classificação
 */
function getClassification(score) {
  return CLASSIFICATIONS.find(c => score >= c.minScore && score <= c.maxScore)
    || CLASSIFICATIONS[CLASSIFICATIONS.length - 1];
}

/**
 * Retorna o percentual de pontuação de uma categoria específica.
 * Considera todas as perguntas daquela categoria.
 * @param {string} category
 * @returns {number} 0–100
 */
function getCategoryScore(category) {
  const indexes = QUESTIONS.reduce((acc, q, i) => {
    if (q.category === category) acc.push(i);
    return acc;
  }, []);
  if (!indexes.length) return 0;
  const earned = indexes.reduce((acc, i) => acc + (state.answers[i] || 0), 0);
  const max = indexes.length * 10;
  return Math.round((earned / max) * 100);
}

/* ================================================================
   5. NAVEGAÇÃO ENTRE TELAS
   ================================================================ */

/**
 * Navega para uma tela pelo nome.
 * Desativa a tela atual e ativa a nova, atualizando os botões de nav.
 * @param {string} screenName - "home" | "quiz" | "result" | "edu"
 */
function navigateTo(screenName) {
  // Bloqueia navegação para resultado se o quiz não foi concluído
  if (screenName === "result" && !state.quizComplete) {
    showToast("⚠️ Conclua o diagnóstico primeiro!");
    return;
  }

  // Esconde todas as telas
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));

  // Mostra a tela alvo
  const target = document.getElementById("screen-" + screenName);
  if (target) {
    target.classList.add("active");
    // Rola para o topo suavemente
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  state.currentScreen = screenName;

  // Atualiza indicadores ativos na nav (desktop e mobile)
  document.querySelectorAll(".nav-btn, .mobile-nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.screen === screenName);
    // Atualiza aria-current para acessibilidade
    if (btn.dataset.screen === screenName) {
      btn.setAttribute("aria-current", "page");
    } else {
      btn.removeAttribute("aria-current");
    }
  });

  // Fecha o menu mobile se estiver aberto
  closeMobileMenu();
}

/**
 * Registra os event listeners de todos os botões de navegação na página.
 * Usa delegação nos botões com data-screen.
 */
function initNavigation() {
  // Delegação: qualquer botão com data-screen navega para aquela tela
  document.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-screen]");
    if (btn) {
      e.preventDefault();
      navigateTo(btn.dataset.screen);
    }
  });
}

/* ================================================================
   6. DARK MODE
   ================================================================ */

/**
 * Aplica o tema (light ou dark) ao HTML e salva no localStorage
 * @param {boolean} isDark
 */
function applyTheme(isDark) {
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  state.darkMode = isDark;
  localStorage.setItem("ecoagro_theme", isDark ? "dark" : "light");
}

/**
 * Alterna entre dark e light mode
 */
function toggleDarkMode() {
  applyTheme(!state.darkMode);
}

/**
 * Inicializa o dark mode: lê preferência salva ou do sistema
 */
function initDarkMode() {
  const saved = localStorage.getItem("ecoagro_theme");
  if (saved) {
    applyTheme(saved === "dark");
  } else {
    // Respeita preferência do sistema operacional
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark);
  }

  const btn = document.getElementById("btn-darkmode");
  if (btn) btn.addEventListener("click", toggleDarkMode);
}

/* ================================================================
   7. MENU MOBILE
   ================================================================ */

/**
 * Abre/fecha o menu mobile
 */
function toggleMobileMenu() {
  const menu = document.getElementById("mobile-nav");
  const btn  = document.getElementById("btn-menu");
  if (!menu || !btn) return;

  const isOpen = menu.classList.toggle("open");
  btn.setAttribute("aria-expanded", String(isOpen));
  menu.setAttribute("aria-hidden", String(!isOpen));
}

/**
 * Fecha o menu mobile (usado após navegação)
 */
function closeMobileMenu() {
  const menu = document.getElementById("mobile-nav");
  const btn  = document.getElementById("btn-menu");
  if (!menu || !btn) return;
  menu.classList.remove("open");
  btn.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-hidden", "true");
}

/**
 * Inicializa o botão do menu mobile
 */
function initMobileMenu() {
  const btn = document.getElementById("btn-menu");
  if (btn) btn.addEventListener("click", toggleMobileMenu);
}

/* ================================================================
   8. QUESTIONÁRIO
   ================================================================ */

/**
 * Reinicia completamente o estado do quiz
 */
function resetQuiz() {
  state.currentQuestion = 0;
  state.answers         = new Array(QUESTIONS.length).fill(null);
  state.answerIndexes   = new Array(QUESTIONS.length).fill(null);
  state.answered        = new Array(QUESTIONS.length).fill(false);
  state.totalScore      = 0;
  state.quizComplete    = false;

  // Reabilita botões de nav para resultado (desabilita até concluir)
  updateResultNavBtn(false);
}

/**
 * Habilita ou desabilita o botão de resultado na nav
 * @param {boolean} enabled
 */
function updateResultNavBtn(enabled) {
  ["nav-result", "mobile-nav-result"].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.disabled = !enabled;
    btn.setAttribute("aria-disabled", String(!enabled));
  });
}

/**
 * Renderiza a barra de progresso com os indicadores por passo
 */
function renderProgressSteps() {
  const container = document.getElementById("progress-steps");
  if (!container) return;
  container.innerHTML = "";
  QUESTIONS.forEach((_, i) => {
    const step = document.createElement("div");
    step.className = "progress-step";
    step.textContent = i + 1;
    step.id = `step-${i}`;
    container.appendChild(step);
  });
}

/**
 * Atualiza a barra de progresso para refletir a pergunta atual
 */
function updateProgress() {
  const current   = state.currentQuestion;
  const total     = QUESTIONS.length;
  const percent   = Math.round(((current) / total) * 100);

  // Barra de preenchimento
  const fill = document.getElementById("progress-fill");
  if (fill) fill.style.width = percent + "%";

  // Texto de progresso
  const progressText = document.getElementById("progress-text");
  if (progressText) progressText.textContent = `Pergunta ${current + 1} de ${total}`;

  // Contadores
  const currentNum = document.getElementById("current-q-num");
  const totalNum   = document.getElementById("total-q-num");
  if (currentNum) currentNum.textContent = current + 1;
  if (totalNum)   totalNum.textContent   = total;

  // Atualiza aria-valuenow na barra
  const track = document.querySelector(".progress-bar-track");
  if (track) track.setAttribute("aria-valuenow", percent);

  // Atualiza classes dos steps
  QUESTIONS.forEach((_, i) => {
    const step = document.getElementById(`step-${i}`);
    if (!step) return;
    step.classList.remove("done", "current", "answered");
    if (i < current && state.answered[i]) {
      step.classList.add("done");
    } else if (i === current) {
      step.classList.add("current");
    } else if (state.answered[i]) {
      step.classList.add("answered");
    }
  });
}

/**
 * Renderiza a pergunta atual com suas opções
 */
function renderQuestion() {
  const q = QUESTIONS[state.currentQuestion];
  if (!q) return;

  // Categoria
  const catEl = document.getElementById("question-category");
  if (catEl) {
    catEl.textContent  = q.categoryLabel;
    catEl.className    = "question-category " + q.categoryClass;
  }

  // Texto da pergunta
  const textEl = document.getElementById("question-text");
  if (textEl) textEl.textContent = q.text;

  // Esconde feedback anterior
  const feedback = document.getElementById("answer-feedback");
  if (feedback) feedback.classList.remove("show");

  // Renderiza opções
  const grid = document.getElementById("options-grid");
  if (!grid) return;

  grid.innerHTML = "";
  const letters = ["A", "B", "C", "D"];

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", "false");
    btn.setAttribute("aria-label", `Opção ${letters[index]}: ${option.text}`);

    // Se já foi respondida, restaura a seleção
    if (state.answered[state.currentQuestion]) {
      const selectedIdx = state.answerIndexes[state.currentQuestion];
      if (index === selectedIdx) {
        btn.classList.add("selected");
        btn.setAttribute("aria-checked", "true");
      }
      btn.disabled = true;
    }

    btn.innerHTML = `
      <span class="option-letter">${letters[index]}</span>
      <span class="option-text">${option.text}</span>
    `;

    // Listener de seleção
    btn.addEventListener("click", () => selectOption(index));
    grid.appendChild(btn);
  });

  // Se pergunta já foi respondida, exibe feedback salvo
  if (state.answered[state.currentQuestion]) {
    const selectedIdx = state.answerIndexes[state.currentQuestion];
    showAnswerFeedback(q.options[selectedIdx].feedback, q.options[selectedIdx].score);
  }

  // Atualiza botões de navegação
  updateNavButtons();
  updateProgress();
}

/**
 * Processa a seleção de uma opção pelo usuário
 * @param {number} optionIndex - índice da opção escolhida
 */
function selectOption(optionIndex) {
  const q = QUESTIONS[state.currentQuestion];
  if (!q) return;

  const option = q.options[optionIndex];

  // Salva a resposta no estado
  state.answers[state.currentQuestion]       = option.score;
  state.answerIndexes[state.currentQuestion] = optionIndex;
  state.answered[state.currentQuestion]      = true;

  // Atualiza visual das opções
  const allBtns = document.querySelectorAll(".option-btn");
  allBtns.forEach((btn, i) => {
    btn.classList.remove("selected");
    btn.setAttribute("aria-checked", "false");
    btn.disabled = true;
    if (i === optionIndex) {
      btn.classList.add("selected");
      btn.setAttribute("aria-checked", "true");
    }
  });

  // Exibe o feedback da resposta
  showAnswerFeedback(option.feedback, option.score);

  // Habilita navegação
  updateNavButtons();
  updateProgress();
}

/**
 * Exibe o feedback visual abaixo da pergunta após a seleção
 * @param {string} text    - mensagem de feedback
 * @param {number} score   - pontuação da opção escolhida
 */
function showAnswerFeedback(text, score) {
  const wrapper  = document.getElementById("answer-feedback");
  const iconEl   = document.getElementById("feedback-icon");
  const textEl   = document.getElementById("feedback-text");
  if (!wrapper || !iconEl || !textEl) return;

  // Ícone baseado na pontuação
  if (score >= 8) {
    iconEl.textContent = "🌟";
  } else if (score >= 5) {
    iconEl.textContent = "✅";
  } else if (score >= 2) {
    iconEl.textContent = "💡";
  } else {
    iconEl.textContent = "⚠️";
  }

  textEl.textContent = text;
  wrapper.classList.add("show");
}

/**
 * Atualiza o estado dos botões Anterior / Próxima / Finalizar
 */
function updateNavButtons() {
  const current   = state.currentQuestion;
  const total     = QUESTIONS.length;
  const hasAnswer = state.answered[current];

  const prevBtn   = document.getElementById("btn-prev");
  const nextBtn   = document.getElementById("btn-next");
  const finishDiv = document.getElementById("quiz-finish");
  const finishBtn = document.getElementById("btn-finish");

  if (prevBtn) prevBtn.disabled = (current === 0);

  const isLast = current === total - 1;

  if (isLast) {
    // Última pergunta: esconde "Próxima", mostra "Ver Resultado"
    if (nextBtn)    nextBtn.style.display    = "none";
    if (finishDiv)  {
      finishDiv.removeAttribute("aria-hidden");
      finishDiv.style.display = "block";
    }
    if (finishBtn)  finishBtn.disabled = !hasAnswer;
  } else {
    if (nextBtn) {
      nextBtn.style.display = "inline-flex";
      nextBtn.disabled = !hasAnswer;
    }
    if (finishDiv) {
      finishDiv.setAttribute("aria-hidden", "true");
      finishDiv.style.display = "none";
    }
  }
}

/**
 * Avança para a próxima pergunta
 */
function goToNextQuestion() {
  if (state.currentQuestion < QUESTIONS.length - 1) {
    state.currentQuestion++;
    renderQuestion();
  }
}

/**
 * Volta para a pergunta anterior
 */
function goToPrevQuestion() {
  if (state.currentQuestion > 0) {
    state.currentQuestion--;
    renderQuestion();
  }
}

/**
 * Inicializa o questionário do zero e navega para a tela
 */
function startQuiz() {
  resetQuiz();
  renderProgressSteps();
  renderQuestion();
  navigateTo("quiz");
}

/**
 * Inicializa os event listeners do quiz
 */
function initQuiz() {
  const prevBtn   = document.getElementById("btn-prev");
  const nextBtn   = document.getElementById("btn-next");
  const finishBtn = document.getElementById("btn-finish");
  const startBtn  = document.getElementById("btn-start");

  if (prevBtn)   prevBtn.addEventListener("click",   goToPrevQuestion);
  if (nextBtn)   nextBtn.addEventListener("click",   goToNextQuestion);
  if (finishBtn) finishBtn.addEventListener("click", finishQuiz);
  if (startBtn)  startBtn.addEventListener("click",  startQuiz);
}

/* ================================================================
   9. RESULTADO
   ================================================================ */

/**
 * Finaliza o quiz, calcula o resultado e navega para a tela de resultado
 */
function finishQuiz() {
  state.totalScore   = calcTotalScore();
  state.quizComplete = true;

  // Salva no histórico
  saveToHistory(state.totalScore);

  // Habilita o botão de resultado na nav
  updateResultNavBtn(true);

  // Renderiza o resultado
  renderResult();

  // Navega para a tela de resultado
  navigateTo("result");
}

/**
 * Renderiza toda a tela de resultado com base no estado atual
 */
function renderResult() {
  const score          = state.totalScore;
  const classification = getClassification(score);

  // Data do diagnóstico
  const dateEl = document.getElementById("result-date");
  if (dateEl) dateEl.textContent = formatDate();

  // Atualiza o card principal
  const scoreCard = document.getElementById("score-card");
  if (scoreCard) {
    scoreCard.className = "score-card " + classification.cardClass;
  }

  // Número animado de pontuação
  animateScoreNumber(score);

  // Gráfico circular
  animateCircle(score, classification.circleColor);

  // Badge de classificação
  const badgeEl = document.getElementById("classification-badge");
  if (badgeEl) badgeEl.className = "classification-badge " + classification.badgeClass;

  const emojiEl = document.getElementById("badge-emoji");
  if (emojiEl) emojiEl.textContent = classification.emoji;

  const classEl = document.getElementById("score-classification");
  if (classEl) classEl.textContent = classification.name;

  // Mensagem e descrição
  const msgEl  = document.getElementById("score-message");
  const descEl = document.getElementById("score-description");
  if (msgEl)  msgEl.textContent  = classification.message;
  if (descEl) descEl.textContent = classification.description;

  // Renderiza listas
  renderList("strengths-list",    classification.strengths);
  renderList("improvements-list", classification.improvements);
  renderList("suggestions-list",  classification.suggestions);

  // Breakdown por categoria
  renderBreakdown();

  // Histórico
  renderHistory();
}

/**
 * Anima o número da pontuação de 0 até o valor final
 * @param {number} targetScore
 */
function animateScoreNumber(targetScore) {
  const el = document.getElementById("score-num");
  if (!el) return;

  let current  = 0;
  const step   = Math.max(1, Math.round(targetScore / 40));
  const timer  = setInterval(() => {
    current = Math.min(current + step, targetScore);
    el.textContent = current;
    if (current >= targetScore) clearInterval(timer);
  }, 30);
}

/**
 * Anima o gráfico circular de pontuação
 * @param {number} score  0–100
 * @param {string} color  cor do traço (hex/rgb)
 */
function animateCircle(score, color) {
  const circle = document.getElementById("circle-progress");
  if (!circle) return;

  // Circunferência do círculo r=50: 2π*50 ≈ 314.16
  const circumference = 2 * Math.PI * 50;
  const offset        = circumference - (score / 100) * circumference;

  circle.style.stroke            = color;
  circle.style.strokeDashoffset  = offset;
}

/**
 * Renderiza uma lista de itens de texto em um elemento ul
 * @param {string}   elementId - id do <ul>
 * @param {string[]} items     - textos
 */
function renderList(elementId, items) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.innerHTML = items
    .map(item => `<li>${item}</li>`)
    .join("");
}

/**
 * Renderiza as barras de desempenho por categoria
 */
function renderBreakdown() {
  const container = document.getElementById("breakdown-bars");
  if (!container) return;

  // Mapeamento de categoria → rótulo e cor
  const categories = [
    { key: "water",  label: "💧 Água",             color: "#2868a8" },
    { key: "energy", label: "⚡ Energia",           color: "#c87e10" },
    { key: "land",   label: "🌱 Solo e Vegetação",  color: "#5a7a2a" },
    { key: "waste",  label: "♻️ Resíduos",          color: "#7a4a9a" },
    { key: "bio",    label: "🌿 Biodiversidade",     color: "#1a7a6a" }
  ];

  container.innerHTML = "";
  container.setAttribute("role", "list");

  categories.forEach(cat => {
    const pct = getCategoryScore(cat.key);

    const item = document.createElement("div");
    item.className = "breakdown-item";
    item.setAttribute("role", "listitem");
    item.innerHTML = `
      <div class="breakdown-label">
        <span>${cat.label}</span>
        <span>${pct}%</span>
      </div>
      <div class="breakdown-track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${cat.label}: ${pct}%">
        <div class="breakdown-fill" style="background:${cat.color}; width:0%"></div>
      </div>
    `;
    container.appendChild(item);

    // Anima a barra com pequeno delay
    requestAnimationFrame(() => {
      setTimeout(() => {
        const fill = item.querySelector(".breakdown-fill");
        if (fill) fill.style.width = pct + "%";
      }, 150);
    });
  });
}

/**
 * Inicializa os event listeners da tela de resultado
 */
function initResult() {
  // Botão reiniciar
  const restartBtn = document.getElementById("btn-restart");
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      startQuiz();
      showToast("🔄 Diagnóstico reiniciado!");
    });
  }

  // Botão compartilhar (copia link ou texto para clipboard)
  const shareBtn = document.getElementById("btn-share");
  if (shareBtn) {
    shareBtn.addEventListener("click", shareResult);
  }
}

/**
 * Compartilha o resultado usando a Web Share API (se disponível)
 * ou copiando para a área de transferência
 */
function shareResult() {
  const classification = getClassification(state.totalScore);
  const text = `Fiz o diagnóstico de sustentabilidade rural no EcoAgro e obtive ${state.totalScore} pontos — classificação: "${classification.name}" ${classification.emoji}. Concurso Agrinho 2026!`;

  if (navigator.share) {
    navigator.share({ title: "EcoAgro — Meu Resultado", text }).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => showToast("✅ Resultado copiado para a área de transferência!"))
      .catch(() => showToast("❌ Não foi possível copiar."));
  } else {
    showToast("📋 Compartilhe manualmente: " + text);
  }
}

/* ================================================================
   10. HISTÓRICO (localStorage)
   ================================================================ */

/**
 * Salva a pontuação atual no histórico do localStorage
 * @param {number} score
 */
function saveToHistory(score) {
  const key     = "ecoagro_history";
  const history = getHistory();
  const classification = getClassification(score);

  const entry = {
    score,
    classificationName: classification.name,
    badgeClass: classification.badgeClass,
    emoji: classification.emoji,
    date: formatDate(),
    timestamp: Date.now()
  };

  // Mantém no máximo os últimos 5 registros
  history.unshift(entry);
  if (history.length > 5) history.splice(5);

  localStorage.setItem(key, JSON.stringify(history));
}

/**
 * Recupera o histórico do localStorage
 * @returns {Array} lista de entradas
 */
function getHistory() {
  try {
    const raw = localStorage.getItem("ecoagro_history");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Limpa o histórico do localStorage
 */
function clearHistory() {
  localStorage.removeItem("ecoagro_history");
  renderHistory();
  showToast("🗑️ Histórico apagado!");
}

/**
 * Renderiza o histórico de avaliações na tela de resultado
 */
function renderHistory() {
  const list    = document.getElementById("history-list");
  const section = document.getElementById("history-section");
  if (!list) return;

  const history = getHistory();
  list.innerHTML = "";

  if (!history.length) {
    list.innerHTML = `<div class="history-empty">Nenhuma avaliação anterior registrada.</div>`;
    return;
  }

  history.forEach(entry => {
    const item = document.createElement("div");
    item.className = "history-item";
    item.setAttribute("role", "listitem");
    item.innerHTML = `
      <span class="history-score">${entry.score} pts</span>
      <span class="history-badge ${entry.badgeClass}">${entry.emoji} ${entry.classificationName}</span>
      <span class="history-date">${entry.date}</span>
    `;
    list.appendChild(item);
  });

  // Mostra botão de limpar apenas se há histórico
  const clearBtn = document.getElementById("btn-clear-history");
  if (clearBtn) clearBtn.style.display = history.length ? "inline-flex" : "none";
}

/**
 * Inicializa os event listeners do histórico
 */
function initHistory() {
  const clearBtn = document.getElementById("btn-clear-history");
  if (clearBtn) clearBtn.addEventListener("click", clearHistory);
}

/* ================================================================
   11. EDUCAÇÃO AMBIENTAL — FILTROS
   ================================================================ */

/**
 * Filtra os cards da tela educativa pela categoria selecionada
 * @param {string} filter - "all" | "water" | "energy" | "soil" | "fauna"
 */
function filterEduCards(filter) {
  const cards = document.querySelectorAll(".edu-card");

  cards.forEach(card => {
    const category = card.dataset.category;
    const show =
      filter === "all" ||
      (filter === "water"  && category === "water") ||
      (filter === "energy" && category === "energy") ||
      (filter === "soil"   && category === "soil") ||
      (filter === "fauna"  && category === "fauna");

    // Usa classe CSS para mostrar/esconder com transição
    if (show) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

/**
 * Inicializa os botões de filtro da educação ambiental
 */
function initEduFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active de todos e adiciona no clicado
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      filterEduCards(btn.dataset.filter);
    });
  });
}

/* ================================================================
   12. INICIALIZAÇÃO GERAL
   ================================================================ */

/**
 * Ponto de entrada principal — chamado quando o DOM está pronto.
 * Inicializa todos os módulos da aplicação.
 */
function init() {
  // Módulos independentes de tela
  initDarkMode();
  initMobileMenu();
  initNavigation();

  // Módulos de telas específicas
  initQuiz();
  initResult();
  initHistory();
  initEduFilters();
  initCarousel();
  initVideo();

  // Renderiza o histórico inicial (caso já exista no localStorage)
  renderHistory();

  // Reinicia o estado do quiz para garantir estado limpo
  resetQuiz();

  // Define a tela inicial
  navigateTo("home");

  // Log de inicialização (dev)
  console.log("🌱 EcoAgro iniciado — Concurso Agrinho 2026");
}

/* ---------------------------------------------------------------
   Aguarda o DOM estar completamente carregado antes de iniciar
--------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", init);

/* ================================================================
   13. CARROSSEL DE FOTOS
   ================================================================ */

/**
 * Inicializa o carrossel de fotos com:
 * - navegação por botões prev/next
 * - indicadores (bolinhas) clicáveis
 * - avanço automático a cada 5 segundos
 * - pausa no hover
 */
function initCarousel() {
  const track   = document.getElementById("carousel-track");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const dotsEl  = document.getElementById("carousel-dots");

  if (!track || !prevBtn || !nextBtn || !dotsEl) return;

  const slides    = track.querySelectorAll(".carousel-slide");
  const total     = slides.length;
  let current     = 0;
  let autoTimer   = null;

  /* Cria as bolinhas indicadoras */
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Ir para slide ${i + 1}`);
    dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
    dot.addEventListener("click", () => goToSlide(i));
    dotsEl.appendChild(dot);
  });

  /**
   * Move o carrossel para o slide de índice `index`
   * @param {number} index
   */
  function goToSlide(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;

    /* Atualiza bolinhas */
    dotsEl.querySelectorAll(".carousel-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
      dot.setAttribute("aria-selected", i === current ? "true" : "false");
    });
  }

  /* Botões de navegação */
  prevBtn.addEventListener("click", () => { goToSlide(current - 1); resetAuto(); });
  nextBtn.addEventListener("click", () => { goToSlide(current + 1); resetAuto(); });

  /* Avanço automático a cada 5s */
  function startAuto() {
    autoTimer = setInterval(() => goToSlide(current + 1), 5000);
  }
  function stopAuto()  { clearInterval(autoTimer); }
  function resetAuto() { stopAuto(); startAuto(); }

  /* Pausa no hover */
  const carousel = document.getElementById("carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", stopAuto);
    carousel.addEventListener("mouseleave", startAuto);
  }

  /* Suporte a swipe em touch */
  let touchStartX = 0;
  track.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goToSlide(current + 1) : goToSlide(current - 1);
      resetAuto();
    }
  });

  startAuto();
}

/* ================================================================
   14. VÍDEO — thumbnail clicável que carrega o iframe
   ================================================================ */

/**
 * Ao clicar no thumbnail do vídeo principal,
 * carrega o iframe do YouTube (lazy load para performance).
 * Usa um vídeo educativo sobre agricultura sustentável.
 */
function initVideo() {
  const thumbBtn       = document.getElementById("video-thumb-btn");
  const iframeContainer= document.getElementById("video-iframe-container");

  if (!thumbBtn || !iframeContainer) return;

  /* ID do vídeo YouTube: "Agricultura Sustentável" — Canal Embrapa */
  const videoId = "RUeYPBjJtjQ";

  thumbBtn.addEventListener("click", function () {
    /* Cria e injeta o iframe */
    const iframe = document.createElement("iframe");
    iframe.src            = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    iframe.title          = "Agricultura Sustentável no Brasil";
    iframe.allow          = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen= true;
    iframe.setAttribute("loading", "lazy");

    iframeContainer.innerHTML = "";
    iframeContainer.appendChild(iframe);

    /* Mostra o iframe e esconde o thumbnail */
    iframeContainer.classList.add("loaded");
    iframeContainer.removeAttribute("aria-hidden");
    thumbBtn.style.display = "none";
  });
}
