/*
  EcoAgro Verde — js/script.js
  Concurso Agrinho 2026 | Ensino Médio
  Tema: Energia Limpa e Resíduos no Campo
*/

/* ---- MENU MOBILE ---- */
var btnHamburger = document.getElementById("btn-hamburger");
var menuMobile   = document.getElementById("menu-mobile");

btnHamburger.addEventListener("click", function() {
  menuMobile.classList.toggle("aberto");
});

document.querySelectorAll(".menu-mobile-link").forEach(function(link) {
  link.addEventListener("click", function() {
    menuMobile.classList.remove("aberto");
  });
});

/* ---- QUIZ ---- */

// 8 perguntas sobre Energia e Resíduos
var perguntas = [
  {
    texto: "Qual é a principal vantagem dos painéis solares fotovoltaicos em propriedades rurais?",
    opcoes: [
      "Poluem menos que o diesel e geram economia a longo prazo",
      "São gratuitos e não precisam de manutenção",
      "Só funcionam em dias ensolarados e quentes",
      "São exclusivos para grandes fazendas"
    ],
    correta: 0,
    feedback: "✅ Exato! Painéis solares reduzem emissões de CO₂ e, após 4 a 7 anos, já geraram economia suficiente para cobrir o investimento."
  },
  {
    texto: "O que é um biodigestor?",
    opcoes: [
      "Um tipo de trator movido a energia solar",
      "Um equipamento que transforma resíduos orgânicos em biogás e biofertilizante",
      "Um sistema de irrigação automático",
      "Uma máquina para compactar fardos de palha"
    ],
    correta: 1,
    feedback: "✅ Isso mesmo! Biodigestores aproveitam dejetos animais e restos vegetais para gerar biogás (energia) e biofertilizante (adubo natural)."
  },
  {
    texto: "O que deve ser feito com embalagens de agrotóxicos após o uso?",
    opcoes: [
      "Queimar no campo para liberar espaço",
      "Enterrar longe das plantações",
      "Devolver nos postos de coleta credenciados",
      "Reutilizar para guardar água"
    ],
    correta: 2,
    feedback: "✅ Correto! A lei exige devolução das embalagens nos postos credenciados. Queimar ou enterrar é crime ambiental."
  },
  {
    texto: "Qual fonte de energia é considerada mais limpa e renovável para o campo?",
    opcoes: [
      "Gerador a diesel",
      "Carvão mineral",
      "Energia solar e eólica",
      "Lenha e carvão vegetal"
    ],
    correta: 2,
    feedback: "✅ Solar e eólica são fontes renováveis que não emitem gases poluentes. O Brasil tem enorme potencial para ambas!"
  },
  {
    texto: "O que é a compostagem?",
    opcoes: [
      "Uma técnica de irrigação por gotejamento",
      "Um processo que transforma resíduos orgânicos em adubo natural",
      "Um tipo de agrotóxico biodegradável",
      "Um método de plantio sem uso de água"
    ],
    correta: 1,
    feedback: "✅ Certo! Compostagem transforma restos de comida, folhas e resíduos vegetais em adubo orgânico de alta qualidade — gratuito e sustentável."
  },
  {
    texto: "Por que queimar resíduos agrícolas é prejudicial?",
    opcoes: [
      "Porque encarece o produto final",
      "Porque mata insetos benéficos apenas",
      "Porque libera gases tóxicos, contamina o ar, destrói o solo e é crime ambiental",
      "Porque atrai pragas para a lavoura"
    ],
    correta: 2,
    feedback: "✅ Isso! A queima libera CO₂ e outras toxinas, contamina o solo e a água, mata micro-organismos benéficos e é proibida por lei."
  },
  {
    texto: "Qual é o principal benefício do biofertilizante produzido em biodigestores?",
    opcoes: [
      "Ele substitui os fertilizantes químicos, reduzindo custos e poluição",
      "Ele elimina pragas automaticamente",
      "Ele substitui a água na irrigação",
      "Ele não precisa ser aplicado no solo"
    ],
    correta: 0,
    feedback: "✅ Exato! O biofertilizante é rico em nutrientes e substitui adubos químicos caros, reduzindo custos e o impacto ambiental da propriedade."
  },
  {
    texto: "O que significa 'eficiência energética' no campo?",
    opcoes: [
      "Usar mais energia para produzir mais",
      "Usar a menor quantidade de energia possível para obter o mesmo resultado",
      "Importar energia de outros países",
      "Desligar todos os equipamentos durante o dia"
    ],
    correta: 1,
    feedback: "✅ Correto! Eficiência energética significa produzir mais com menos energia — usando equipamentos modernos, horários inteligentes e monitoramento constante."
  }
];

var perguntaAtual = 0;
var pontuacao     = 0;

var elTexto    = document.getElementById("quiz-texto");
var elOpcoes   = document.getElementById("quiz-opcoes");
var elFeedback = document.getElementById("quiz-feedback");
var elNum      = document.getElementById("num-pergunta");
var elFill     = document.getElementById("progresso-fill");
var btnAvancar = document.getElementById("btn-avancar");
var elBox      = document.getElementById("quiz-box");
var elResult   = document.getElementById("quiz-resultado");

// Pesos: resposta certa = 10 pts
function mostrarPergunta() {
  var p = perguntas[perguntaAtual];
  elNum.textContent  = "Pergunta " + (perguntaAtual + 1) + " de " + perguntas.length;
  elFill.style.width = ((perguntaAtual / perguntas.length) * 100) + "%";
  elTexto.textContent = p.texto;

  elOpcoes.innerHTML    = "";
  elFeedback.innerHTML  = "";
  elFeedback.className  = "quiz-feedback";
  btnAvancar.style.display = "none";

  p.opcoes.forEach(function(op, i) {
    var btn = document.createElement("button");
    btn.className   = "opcao-btn";
    btn.textContent = op;
    btn.addEventListener("click", function() { checarResposta(i, p.correta, p.feedback); });
    elOpcoes.appendChild(btn);
  });
}

function checarResposta(escolhida, correta, feedback) {
  var btns = elOpcoes.querySelectorAll(".opcao-btn");
  btns.forEach(function(b) { b.disabled = true; });

  if (escolhida === correta) {
    pontuacao += 10;
    btns[escolhida].classList.add("certa");
    elFeedback.textContent = feedback;
    elFeedback.className   = "quiz-feedback mostrar acerto";
  } else {
    btns[escolhida].classList.add("errada");
    btns[correta].classList.add("certa");
    elFeedback.textContent = "❌ Não foi dessa vez! " + feedback.replace("✅", "Lembre-se:");
    elFeedback.className   = "quiz-feedback mostrar erro";
  }
  btnAvancar.style.display = "inline-flex";
  if (perguntaAtual === perguntas.length - 1) btnAvancar.textContent = "Ver Resultado 🌿";
}

btnAvancar.addEventListener("click", function() {
  perguntaAtual++;
  if (perguntaAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
});

function mostrarResultado() {
  elBox.style.display    = "none";
  elResult.style.display = "block";
  elFill.style.width     = "100%";

  var icone, classe, msg, dicas;

  if (pontuacao >= 70) {
    icone = "🌟"; classe = "Energia Exemplar!";
    msg   = "Parabéns! Sua propriedade usa energia limpa e gerencia os resíduos com excelência. É referência para a região!";
    dicas = ["Compartilhe suas práticas com outros produtores","Busque certificações de sustentabilidade","Considere vender energia excedente à rede elétrica"];
  } else if (pontuacao >= 50) {
    icone = "🌿"; classe = "Em Desenvolvimento";
    msg   = "Bom caminho! Você já tem consciência sobre o tema. Alguns ajustes podem elevar bastante o nível da sua propriedade.";
    dicas = ["Pesquise programas de financiamento para energia solar","Implante compostagem para resíduos orgânicos","Verifique os pontos de coleta de embalagens próximos"];
  } else {
    icone = "🌱"; classe = "Precisa Evoluir";
    msg   = "Não desanime! O primeiro passo é ter conhecimento — e você já está aqui. Pequenas mudanças geram grande impacto.";
    dicas = ["Procure a Emater ou Senar para orientação gratuita","Comece pela separação correta do lixo","Instale pelo menos uma cisterna ou painel solar de teste"];
  }

  document.getElementById("resultado-icone").textContent = icone;
  document.getElementById("resultado-classe").textContent = classe;
  document.getElementById("resultado-msg").textContent    = msg;
  document.getElementById("resultado-pts").textContent    = pontuacao;

  var lista = document.getElementById("resultado-dicas");
  lista.innerHTML = dicas.map(function(d) { return "<li>" + d + "</li>"; }).join("");
}

document.getElementById("btn-reiniciar").addEventListener("click", function() {
  perguntaAtual = 0; pontuacao = 0;
  elBox.style.display    = "block";
  elResult.style.display = "none";
  mostrarPergunta();
});

mostrarPergunta();

/* ---- MENU — destaca link ativo ---- */
var linksMenu = document.querySelectorAll(".menu-link");
window.addEventListener("scroll", function() {
  var pos = window.scrollY + 80;
  document.querySelectorAll("section[id]").forEach(function(sec) {
    if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
      linksMenu.forEach(function(l) { l.classList.remove("ativo"); });
      var ativo = document.querySelector('.menu-link[href="#' + sec.id + '"]');
      if (ativo) ativo.classList.add("ativo");
    }
  });
});

/* ---- DARK MODE ---- */
var btnDark = document.getElementById("btn-darkmode");

// Carrega preferência salva
var temaSalvo = localStorage.getItem("ecoagro_verde_tema");
if (temaSalvo === "escuro") {
  document.documentElement.setAttribute("data-tema", "escuro");
  btnDark.textContent = "☀️";
}

btnDark.addEventListener("click", function() {
  var atual = document.documentElement.getAttribute("data-tema");
  if (atual === "escuro") {
    document.documentElement.removeAttribute("data-tema");
    btnDark.textContent = "🌙";
    localStorage.setItem("ecoagro_verde_tema", "claro");
  } else {
    document.documentElement.setAttribute("data-tema", "escuro");
    btnDark.textContent = "☀️";
    localStorage.setItem("ecoagro_verde_tema", "escuro");
  }
});
