// Estrutura de dados com as cenas do jogo
const cenas = {
  inicio: {
    titulo: "A Entrada da Floresta",
    texto: "Você está na entrada de uma floresta escura e fechada. Um vento frio sopra entre as árvores.",
    opcoes: [
      { texto: "🌲 Seguir pelo caminho da esquerda", proxima: "floresta" },
      { texto: "⛰️ Subir a montanha da direita", proxima: "montanha" }
    ]
  },
  floresta: {
    titulo: "Dentro da Floresta",
    texto: "As árvores cobrem a luz do sol. Você ouve o rugido de uma criatura ao longe e avista uma caverna.",
    opcoes: [
      { texto: "🦇 Entrar na Caverna", proxima: "caverna" },
      { texto: "🏃 Correr de volta para a borda", proxima: "inicio" }
    ]
  },
  montanha: {
    titulo: "O Pico Nebuloso",
    texto: "A subida é árdua, mas você encontra um baú antigo no topo da montanha.",
    opcoes: [
      { texto: "📦 Abrir o Baú", proxima: "tesouro" }
    ]
  },
  caverna: {
    titulo: "A Caverna Escura",
    texto: "Um urso gigante acorda e olha para você! Não há tempo para pensar.",
    opcoes: [
      { texto: "⚔️ Lutar contra o urso", proxima: "gameover" }
    ]
  },
  tesouro: {
    titulo: "Vitória!",
    texto: "Você encontrou o Tesouro Perdido do Templo! Você venceu a aventura.",
    opcoes: [
      { texto: "🔄 Recomeçar Aventura", proxima: "inicio" }
    ]
  },
  gameover: {
    titulo: "Fim de Jogo",
    texto: "O urso era forte demais... Você foi derrotado.",
    opcoes: [
      { texto: "🔄 Tentar Novamente", proxima: "inicio" }
    ]
  }
};

// Variáveis de controle de estado
let historico = [];
let cenaAtualId = "inicio";

// Inicializa a interface do jogo
function carregarCena(idCena) {
  const cena = cenas[idCena];
  
  // Atualiza Título e Texto
  document.getElementById("cena-titulo").innerText = cena.titulo;
  document.getElementById("cena-texto").innerText = cena.texto;
  
  // Limpa e recria as opções disponíveis
  const containerOpcoes = document.getElementById("opcoes-container");
  containerOpcoes.innerHTML = "";
  
  cena.opcoes.forEach(opcao => {
    const botao = document.createElement("button");
    botao.className = "btn";
    botao.innerText = opcao.texto;
    botao.onclick = () => escolherOpcao(opcao.proxima);
    containerOpcoes.appendChild(botao);
  });

  // Atualiza estado do botão de voltar e contador de passos
  document.getElementById("btn-voltar").disabled = historico.length === 0;
  document.getElementById("passo-contador").innerText = `Passos: ${historico.length}`;
}

// Função para avançar no jogo
function escolherOpcao(proximaCenaId) {
  // Salva o ID da cena atual no histórico (Pilha)
  historico.push(cenaAtualId);
  
  // Define a nova cena e renderiza na tela
  cenaAtualId = proximaCenaId;
  carregarCena(cenaAtualId);
}

// Função para desfazer / voltar um passo
function voltarPasso() {
  if (historico.length > 0) {
    // Remove a última cena salva e define como cena atual
    cenaAtualId = historico.pop();
    carregarCena(cenaAtualId);
  }
}

// Carrega o jogo ao iniciar
carregarCena("inicio");