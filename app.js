// 1. Captura de Elementos do DOM
const inputDesc = document.querySelector("#desc-despesa");
const inputValor = document.querySelector("#valor-gringo");

const inputCotacao = document.querySelector("#cotacao");
const btnAdicionar = document.querySelector("#btn-adicionar");
const listaDespesasDOM = document.querySelector("#lista-despesas");
const totalBrlDOM = document.querySelector("#total-brl");

// 2. Estado da Aplicação (Array de Objetos)
// Tentamos buscar dados salvos previamente. Se nao houver, iniciamos um Array vazio [].
let despesas = JSON.parse(localStorage.getItem("viagem_despesas")) || [];

// 3. Funçao para persistir dados
const salvarNoLocalStorage = () => {
  // 0 LocalStorage so aceita textos (Strings).
  // O JSON.stringify converte nosso Array em formato de texto.
  localStorage.setItem("viagem_despesas", JSON.stringify(despesas));
};

const adicionarDespesa = () => {
  // O metodo .trim() remove espacos em branco acidentais no inicio e no fim do texto.
  const desc = inputDesc.value.trim();

  // parseFloat converte o texto digitado no input para um numero decimal nativo do JS.
  const valorOriginal = parseFloat(inputValor.value);
  const cotacao = parseFloat(inputCotacao.value);

  // Validação de Dados (Condicional)
  // isNaN significa "Is Not a Number" (Nao e um numero). Verifica se a conversao falhou.
  if (desc === "" || isNaN(valorOriginal) || isNaN(cotacao)) {
    alert(
      "Por favor, preencha todos os campos corretamente com valores válidos."
    );

    return; // Interrompe a execução da função imediatamente.
  }
  // Processamento Logico (Operador Aritmetico)
  const valorConvertidoBRL = valorOriginal * cotacao;

  // Estrutura de Dados: Criando um Objeto para representar uma unica despesa
  const novaDespesa = {
    id: Date.now(), // Gera um numero unico baseado nos milissegundos atuais para identificar o item
    descricao: desc,
    valorEstrangeiro: valorOriginal,
    valorReal: valorConvertidoBRL,
  };
  // Modificando o Array e salvando
  despesas.push(novaDespesa);
  salvarNoLocalStorage();

  // Limpeza da Interface
  inputDesc.value = "";
  inputValor.value = "";
  inputCotacao.value = "";

  // Chama a funcao que vai desenhar a lista na tela (que criaremos no próximo passo)
  atualizarTela();
};
// Vinculando a ação ao clique do botao
btnAdicionar.addEventListener("click", adicionarDespesa);

const atualizarTela = () => {
  // 1. Gerando os itens da lista usando o metodo .map()
  // O map percorre o Array e retorna um novo Array contendo os blocos de HTML.
  const htmlDaLista = despesas.map((item) => {
    // O método .toFixed(2) garante a exibiçao com duas casas decimais.
    return `
    <li>
    <div>
    <strong>${item.descricao}</strong> <br>
    
    <small>U$ ${item.valorEstrangeiro.toFixed(2)}</small>
    </div>
    <span class="valor">R$ ${item.valorReal.toFixed(2)}</span>
    </li>
    `;
  });
  // o .join('') une todos os blocos gerados pelo map em um unico texto contínuo,
  // que é então injetado na tag <ul> do nosso HTML.
  listaDespesasDOM.innerHTML = htmlDaLista.join("");

  // 2. Calculando o Total usando o metodo .forEach()
  let somaTotal = 0;

  // 0 forEach executa uma funcao para cada item, somando o valorReal à nossa variavel.
  despesas.forEach((item) => {
    somaTotal += item.valorReal; // Equivalente a: somaTotal = somaTotal + item.valorReal
  });
  // Atualizando o elemento de texto no cabeçalho
  totalBrlDOM.textContent = `R$ ${somaTotal.toFixed(2)}`;
};
// Execução Inicial: Chamamos a funçao assim que o script carrega para renderizar
// dados antigos que ja possam estar salvos no LocalStorage.
atualizarTela();
