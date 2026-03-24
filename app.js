const inputDesc = document.querySelector("#desc-despesa");
const inputValor = document.querySelector("#valor-gringo");
const inputCotacao = document.querySelector("#cotacao");
const btnAdicionar = document.querySelector("#btn-adicionar");
const listaDespesaDOM = document.querySelector("lista-despesas");
const totalBrlDOM = document.querySelector("#total-brl");

let despesas = JSON.parse(localStorage.getItem("viagem-despesas")) || [];

const salvarNoLocalStorage = () => {
  localStorage.setItem("viagem-despesas", JSON.stringify(despesas));
};

const adicionarDespesa = () => {
  const desc = inputDesc.value.trim();

  const valorOriginal = parseFloat(inputValor.value);
  const cotacao = parseFloat(inputCotacao.value);

  if (desc === "" || isNaN(valorOriginal) || isNaN(cotacao)) {
    alert(
      "Por favor, preencha todos os campso corretamente com valores válidos."
    );
    return;
  }
  const valorConvertidoBRL = valorOriginal * cotacao;

  const novaDespesa = {
    id: Date.now(),
    descricao: desc,
    valorEstrageiro: valorOriginal,
    valorReal: valorConvertidoBRL,
  };
  despasas.push(novaDespesa);
  salvarNoLocalStorage();

  inputDesc.value = "";
  inputValor.value = "";
  inputCotacao.value = "";

  atualizarTela();
};

btnAdicionar.addEventListener("click", adicionarDespesa);

const atualizarTela = () => {
  const htmlDaLista = despesas.map((item) => {
    return;
    <html>
      <li>
        <div>
          <strong>${item.descricao}</strong> <br></br>
          <small>U$ ${item.valorEstrageiro.toFixed(2)}</small>
        </div>
        <span class="valor">R$ ${item.valorReal.toFixed(2)}</span>
      </li>
      ;
    </html>;
  });
  listaDespesaDOM.innerHTML = htmlDaLista.join("");

  let somaTotal = 0;

  despesas.forEach((item) => {
    somaTotal += item.valorReal;
  });

  totalBrlDOM.textContent = `R$ ${somaTotal.toFixed(2)}`;
};

atualizarTela();
