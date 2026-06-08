# 🌱 EcoAgro — Diagnóstico de Sustentabilidade Rural

> **Concurso Agrinho 2026 · Subcategoria 3 — Ensino Médio**
> Tema: *Agro forte, futuro sustentável*

---

## 📋 Sobre o Projeto

O **EcoAgro** é um site interativo que permite a estudantes e produtores rurais responderem perguntas sobre práticas sustentáveis em sua propriedade e receberem uma **análise personalizada** do seu impacto ambiental, com sugestões concretas de melhoria.

O objetivo é promover a consciência ambiental no campo, mostrando que produtividade e sustentabilidade caminham juntas — um **agro forte** nasce de um **futuro sustentável**.

---

## 🎯 Objetivo Educacional

- Sensibilizar estudantes do Ensino Médio sobre práticas sustentáveis no agronegócio
- Mostrar de forma prática o conceito de **impacto ambiental** e como mensurá-lo
- Apresentar alternativas viáveis para um campo mais sustentável
- Estimular o pensamento crítico sobre o modelo de produção rural atual

---

## 🖥️ Telas do Site

| Tela | Descrição |
|------|-----------|
| **Home** | Apresentação do projeto, banner com tema do concurso e acesso ao diagnóstico |
| **Questionário** | 10 perguntas interativas sobre práticas sustentáveis com pesos diferentes |
| **Resultado** | Pontuação, classificação automática, pontos fortes, melhorias e breakdown por categoria |
| **Educação Ambiental** | 8 cards informativos sobre água, energia, solo e biodiversidade |

### Classificações do Diagnóstico

| Pontuação | Classificação |
|-----------|--------------|
| 0 – 30    | ⚠️ Impacto Alto |
| 31 – 60   | 🌱 Em Desenvolvimento |
| 61 – 80   | 🌿 Sustentável |
| 81 – 100  | 🌟 Agro Sustentável |

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico** — estrutura acessível com elementos `<section>`, `<article>`, `<header>`, `<nav>`, `<footer>`, `<fieldset>`, atributos ARIA
- **CSS3 Puro** — variáveis CSS (tokens de design), Flexbox, CSS Grid, Media Queries, animações com `@keyframes`, transições, dark mode com `[data-theme]`
- **JavaScript Puro (ES6+)** — manipulação DOM, eventos, `localStorage`, funções modulares, arrow functions, template literals, destructuring

> **Nenhuma biblioteca ou framework externo foi utilizado.**

---

## 🗂️ Estrutura de Arquivos

```
projeto-agrinho/
│
├── index.html          # Estrutura HTML completa das 4 telas
├── README.md           # Este arquivo
│
├── css/
│   └── style.css       # Estilos completos (variáveis, layout, responsividade, dark mode)
│
├── js/
│   └── script.js       # Lógica da aplicação (quiz, resultado, navegação, localStorage)
│
├── img/                # (reservado para imagens futuras)
└── assets/             # (reservado para recursos adicionais)
```

---

## 🚀 Como Usar

### Opção 1 — Abrir localmente
1. Baixe ou clone o repositório
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Não é necessário servidor ou instalação

### Opção 2 — GitHub Pages
1. Faça fork ou upload do repositório para o seu GitHub
2. Vá em **Settings → Pages**
3. Em *Source*, selecione `main` e a pasta `/root`
4. Clique em **Save** — o site estará disponível em `https://seu-usuario.github.io/projeto-agrinho`

---

## ⚙️ Funcionalidades

- [x] Barra de progresso animada no questionário
- [x] Dark Mode com preferência salva no `localStorage`
- [x] Botão reiniciar avaliação
- [x] Histórico das últimas 5 avaliações salvo no `localStorage`
- [x] Gráfico circular animado de pontuação (CSS + SVG)
- [x] Barras de desempenho por categoria (Água, Energia, Solo, Resíduos, Biodiversidade)
- [x] Filtros interativos na tela de Educação Ambiental
- [x] Feedback visual imediato após cada resposta
- [x] Navegação fluida entre telas sem recarregamento
- [x] Compartilhamento do resultado (Web Share API + fallback)
- [x] Responsivo para mobile e desktop (Media Queries)
- [x] Acessibilidade: atributos ARIA, `role`, `aria-live`, `focus-visible`
- [x] Menu hambúrguer para mobile
- [x] Ilustração CSS pura (paisagem rural animada)

---

## 🌿 Tema: Agro forte, futuro sustentável

O tema do Concurso Agrinho 2026 reflete a necessidade de conciliar a produção agrícola com a preservação ambiental. O Brasil é uma potência agrícola global, mas esse protagonismo só será sustentável a longo prazo se houver:

- **Gestão consciente da água** — irrigação eficiente, captação pluvial, proteção de mananciais
- **Transição energética** — adoção de energia solar, eólica e biogás nas propriedades
- **Preservação da biodiversidade** — matas ciliares, APPs, corredores ecológicos
- **Manejo sustentável do solo** — plantio direto, rotação de culturas, compostagem
- **Descarte correto de resíduos** — embalagens de agrotóxicos, orgânicos, recicláveis

O **EcoAgro** traduz esses conceitos em um diagnóstico acessível e educativo para o público do Ensino Médio.

---

## 👥 Autores

| Campo | Informação |
|-------|-----------|
| **Projeto** | EcoAgro — Diagnóstico de Sustentabilidade Rural |
| **Concurso** | Agrinho 2026 — Subcategoria 3, Ensino Médio |
| **Tema** | Agro forte, futuro sustentável |

*(Adicione aqui o nome completo dos autores, escola e orientador)*

---

## 🤝 Créditos

- **Concurso Agrinho** — SENAR-PR (Serviço Nacional de Aprendizagem Rural do Paraná)
- Ícones decorativos: criados puramente com HTML/CSS (sem dependências externas)
- Ilustração da paisagem rural: CSS Art criada para este projeto
- Referências técnicas: Embrapa, SENAR, Código Florestal Brasileiro (Lei 12.651/2012)

---

## 🤖 Prompts de IA Utilizados

Durante o desenvolvimento do projeto, utilizamos ferramentas de IA como apoio em algumas etapas pontuais. Abaixo estão os prompts que usamos:

---

**1. Pesquisa inicial sobre o tema**
```
Quais são as principais práticas sustentáveis adotadas por pequenos
produtores rurais no Brasil? Me explica de forma simples para eu
entender e usar num trabalho escolar.
```
*Usamos para entender melhor o tema antes de definir as perguntas do questionário.*

---

**2. Ajuda com uma parte do CSS**
```
Como faço uma barra de progresso animada só com CSS e JavaScript puro,
sem usar nenhuma biblioteca? Quero que ela avance conforme o usuário
responde as perguntas de um quiz.
```
*Tínhamos a ideia da barra, mas não sabíamos como animar o preenchimento. A IA explicou o conceito de `width` com `transition`, e a gente adaptou pro nosso projeto.*

---

**3. Dúvida sobre localStorage**
```
Como salvar e recuperar dados no localStorage com JavaScript?
Quero guardar o histórico de pontuações do usuário.
```
*Usamos para entender a sintaxe do `localStorage.setItem` e `getItem`. O código final foi escrito por nós com base na explicação.*

---

**4. Revisão de acessibilidade**
```
O que são atributos ARIA no HTML? Preciso deixar meu site acessível
para pessoas com deficiência visual. Me dá exemplos práticos.
```
*Aprendemos sobre `aria-label`, `aria-live` e `role` para melhorar a acessibilidade do site.*

---

**5. Revisão de conteúdo educativo**
```
Me dá 4 dicas práticas e simples sobre irrigação consciente no campo
para colocar num card informativo de um site educativo para estudantes
do ensino médio.
```
*Usamos como ponto de partida para os cards da tela de Educação Ambiental, revisando e adaptando com nossas próprias palavras.*

---

> **Observação:** A IA foi utilizada como ferramenta de pesquisa e aprendizado, assim como usamos o Google ou um livro. A estrutura do projeto, as escolhas de design, as perguntas do diagnóstico e toda a lógica foram pensadas e desenvolvidas pela equipe.

---

## 📄 Licença

Projeto desenvolvido exclusivamente para fins educacionais no contexto do **Concurso Agrinho 2026**. Uso livre para fins não comerciais com crédito aos autores.

---

*"Agro forte, futuro sustentável."* 🌱
