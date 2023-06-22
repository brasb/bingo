/*
    Bingo:
        * criação de tabelas;
        * 25 números aleatórios;
        *   * de 1 a 75;
        *   * sem repetições;
        *   * B: só de 1 a 15;
        *   * I: só de 16 a 30;
        *   * N: só de 31 a 45;
        *   * G: só de 46 a 60;
        *   * O: só de 61 a 75;
        * sortear só um número por segundo e mostrá-lo na tela;
        * marcar cartelas durante o sorteio;
        * deverá ser indicado se um ou mais jogadores ganharem o jogo.
*/
// Mínimo 24 número sorteados, intervalo 1s

const PREFIXO_ID_CONTAINER = "linha_";

// Sorteados é a lista de números que já foram sorteados, para evitar repetição.
function gerarNumero(sorteados, min, max)
{
    // Fica sorteando até encontrar um número único.
    let n = -1;
    while (n === -1 || sorteados.includes(n)) {
        n = Math.ceil(Math.random() * (max - min) + min);
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

function criarContainer(divJogos, numeroId) {
    let novoContainer = document.createElement("div");
    novoContainer.setAttribute("class", "linha_jogo");
    novoContainer.setAttribute("id", PREFIXO_ID_CONTAINER + numeroId);
    divJogos.appendChild(novoContainer);
    return novoContainer;
}

function obterContainerDisponivel() 
{
    const JOGOS = document.getElementById("jogos");

    if (JOGOS.childElementCount === 0) {
        return criarContainer(JOGOS, 0);
    }
    
    let container = null;
    let i = 0;    
    while (container === null) {
        let id = PREFIXO_ID_CONTAINER + i;
        let elemento = document.getElementById(id);

        if (elemento === null) {
            container = criarContainer(JOGOS, i);
            break;
        }

        if (elemento.childElementCount < 4) {
            container = elemento;
        } 

        i++;
    }

    return container;
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
    for (let i = 0; i < 6; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < 5; j++) {
            let td = document.createElement("td");

            if (i === 0) {
                td.innerText = PRIMEIRA_LINHA[j];
                td.setAttribute("class", "letra_titulo_cartela");
            } else if (j === 2 && i === 3) {
                td.innerText = "X";
            } else {
                let min, max;

                switch (j) {
                    case 0:
                        min = 1;
                        max = 15;
                        break;
                    case 1:
                        min = 16;
                        max = 30;
                        break;
                    case 2:
                        min = 31;
                        max = 45;
                        break;
                    case 3:
                        min = 46;
                        max = 60;
                        break;
                    case 4:
                        min = 61;
                        max = 75;
                        break;
                }

                let sorteado = gerarNumero(numerosJaSorteados, min, max);
                numerosJaSorteados.push(sorteado);
                td.innerText = formatarNumero(sorteado);
            }

            tr.appendChild(td);
        }
        tabela.appendChild(tr);
    }
}

function formatarResultados(resultados)
{
    let texto = "";
    for (let i = 0; i < resultados.length; i++) {
        if (texto !== "") {
            texto += ", ";
            let linhas = texto.split("\n");
            if (linhas[linhas.length - 1].length >= 80) {
                texto += "\n";
            }
        }
        texto += resultados[i];
    }
    texto += ".";
    return texto;
}

let sorteados = [];
function atualizarSorteio()
{
    let n = gerarNumero(sorteados, 1, 75);
    sorteados.push(n);

    let containerResultados = document.getElementById("container_resultados");
    containerResultados.innerText = formatarResultados(sorteados);
}

function iniciarSorteio() 
{
    setInterval(atualizarSorteio, 200);
}

function limparTabelas()
{
    let jogos = document.getElementById("jogos");
    while (jogos.firstChild !== null) {
        jogos.firstChild.remove();
    }
}

gerarCartela("João");
gerarCartela("Carlos");
gerarCartela("Afonso");
gerarCartela("Valéria");
gerarCartela("Irineu");
gerarCartela("Ambrósio");
gerarCartela("Pedro");
gerarCartela("Augustinho");
gerarCartela("Inácio");
