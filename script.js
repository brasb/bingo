const PREFIXO_CLASSE_CONTAINER = "linha_";

// Sorteados é a lista de números que já foram sorteados, para evitar repetição.
function gerarNumero(sorteados)
{
    // Fica sorteando até encontrar um número único.
    let n = -1;
    while (n === -1 || sorteados.includes(n)) {
        n = Math.ceil(Math.random() * 90.0);
    }
    
    return n;
}

function formatarNumero(n)
{
    let result = parseInt(n);
    return n >= 10 ? result : "0" + result;
}

function adicionarCartela()
{
    let nome = prompt("Digite o nome do jogador:");
    gerarCartela(nome);
}

// Cria se não existir.
function retornarContainerTabela(divPai, classe)
{
    let lista = divPai.getElementsByClassName(classe);
    let resultado;

    if (lista == null) {
        resultado = document.createElement("div");
        resultado.setAttribute("class", classe);
        divPai.appendChild(resultado);

    } else {
        resultado = lista[0];
    }

    return resultado;
}

function obterContainerDisponivel() // TODO: this.
{
    const JOGOS = document.getElementById("jogos");

    let i = 0;    
    if (divJogos.childElementCount === 0) {
        return 0;
    }
    
    let containerDisponivelEncontrado = false;
    while (!containerDisponivelEncontrado) {
        let nome = PREFIXO_CLASSE_CONTAINER + i;
        let listaElementos = getElementsByClassName(nome);
        let elemento = listaElementos == null ? null : listaElementos[0];

        if (elemento.childElementCount)
        

        i++;
    }
}

function gerarCartela(nome)
{

    // A div de container é diferente, dependendo da quantidade de cartelas criadas.
    let container = obterContainerDisponivel(); 

    let jogoDiv = document.createElement("div");
    jogoDiv.setAttribute("class", "jogo");
    container.appendChild(jogoDiv);

    let tituloDiv = document.createElement("div");
    tituloDiv.setAttribute("class", "titulo");
    jogoDiv.appendChild(tituloDiv);

    let title = document.createElement("h3");
    title.innerText = nome;
    tituloDiv.appendChild(title);

    let cartelaDiv = document.createElement("cartela");
    cartelaDiv.setAttribute("class", "cartela");
    jogoDiv.appendChild(cartelaDiv);

    let tabela = document.createElement("table");
    cartelaDiv.append(tabela);

    let numerosJaSorteados = [];
    const PRIMEIRA_LINHA = ["B", "I", "N", "G", "O"];
    for (let i = 0; i < 5; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < 5; j++) {
            let td = document.createElement("td");

            if (i === 0) {
                td.innerText = PRIMEIRA_LINHA[j];
                td.setAttribute("class", "letra_titulo_cartela");
            } else {
                let sorteado = gerarNumero(numerosJaSorteados);
                numerosJaSorteados.push(sorteado);
                td.innerText = formatarNumero(sorteado);
            }

            tr.appendChild(td);
        }
        tabela.appendChild(tr);
    }
}

function iniciarSorteio() 
{

}
