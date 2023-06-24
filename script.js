// As tabelas são divididas em várias linhas (divs) com o id linha_x.
const PREFIXO_ID_CONTAINER = "linha_";
// Cor usada para preencher uma coluna que teve o número sorteado.
const COR_PREENCHIMENTO = "rgb(54, 255, 55)";

// Definida automaticamente.
let corPadrao;
// Lista de números já sorteados para evitar repetição e mostrar na seção de resultados.
let sorteados = [];
// ID do set interval usado para a função de atualizar o sorteio periodicamente.
let idSetInterval;
// Se um sorteio está sendo feito pela primeira vez.
let primeiraVez = true;
let quantidadeCartelas = 0;

/*
    Gera um número inteiro pseudoaleatoriamente.

    blacklist -> lista de números que não podem ser sorteados.
    min -> valor mínimo do número sorteado (inclusivo).
    max -> valor máximo do número sorteado (inclusivo).
*/
function gerarNumero(blacklist, min, max)
{
    // Fica sorteando até encontrar um número único.
    let n;
    while (n === undefined || blacklist.includes(n)) {
        n = Math.ceil(Math.random() * (max - min) + min);
    }

    return n;
}

// Garante que todos os números do bingo terão uma quantidade de dígitos uniforme.
function formatarNumero(n)
{
    let result = parseInt(n);
    return n >= 10 ? result : "0" + result;
}

function adicionarCartela()
{
    // O ID é indefinido enquanto nenhum sorteio estiver sendo realizado.
    if (idSetInterval !== undefined) {
        alert("Você não pode adicionar tabelas durante o sorteio!");
        return;
    }

    // Pergunta o nome. Pergunta novamente se o usuário não inserir nenhum valor.
    let nome = "";
    while ((nome = prompt("Insira o nome do jogador:")) === "") {
        alert("Não deixe o nome vazio!");
    }

    // Caso o usuário tenha decidido cancelar.
    if (nome === null) {
        return;
    }

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

// Cria um container para uma linha de cartelas.
function criarContainer(divJogos, numeroId)
{
    let novoContainer = document.createElement("div");
    novoContainer.setAttribute("class", "linha_jogo");
    novoContainer.setAttribute("id", PREFIXO_ID_CONTAINER + numeroId);
    divJogos.appendChild(novoContainer);
    return novoContainer;
}

// Tenta obter uma linha de cartelas com uma vaga. Se não houver nenhuma, cria uma nova.
function obterContainerDisponivel()
{
    const JOGOS = document.getElementById("jogos");

    if (JOGOS.childElementCount === 0) {
        return criarContainer(JOGOS, 0);
    }

    let container;
    for (let i = 0; container === undefined; i++) {
        let id = PREFIXO_ID_CONTAINER + i;
        let elemento = document.getElementById(id);

        if (elemento === null) {
            container = criarContainer(JOGOS, i);
        } else if (elemento.childElementCount < 4) { // Uma linha é vaga se tiver menos do que 4 cartelas.
            container = elemento;
        }
    }

    return container;
}

function gerarCartela(nome)
{
    quantidadeCartelas += 1;

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

    let cartelaDiv = document.createElement("div");
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
            } else if (j === 2 && i === 3) { // X no centro.
                td.innerText = "X";
            } else {
                // Valor mínimo e máximo do número que vai ser sorteado.
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

function formatarNumerosSorteados(resultados) {
    let texto = "Números sorteados: ";
    const TAMANHO_PADRAO = texto.length;

    for (let i = 0; i < resultados.length; i++) {
        if (texto.length !== TAMANHO_PADRAO) {
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

function eNumerico(texto)
{
    return !isNaN(parseInt(texto));
}

function atualizarSorteio()
{
    let n = gerarNumero(sorteados, 1, 75);
    sorteados.push(n);

    let vencedores = []
    let jogos = document.getElementsByClassName("cartela");
    for (const jogo of jogos) {
        let tds = jogo.getElementsByTagName("td");

        let bingo = true;
        for (const td of tds) {
            if (!eNumerico(td.innerText)) {
                corPadrao = td.style.backgroundColor;
                continue;
            }

            if (td.innerText == n) {
                td.style.backgroundColor = COR_PREENCHIMENTO;
            }

            if (td.style.backgroundColor != COR_PREENCHIMENTO) {
                bingo = false;
            }
        }

        if (bingo) {
            vencedores.push(jogo.parentNode.getElementsByTagName("h3")[0].innerText);
            clearInterval(idSetInterval);
            idSetInterval = undefined;
        }
    }

    let containerResultados = document.getElementById("container_resultados");
    containerResultados.innerText = formatarNumerosSorteados(sorteados);

    if (vencedores.length > 0) {
        containerResultados.innerText += "\n\nVencedores: " + vencedores.join(", ") + "."
    }
}

function desfazerSorteio()
{
    sorteados = []

    let containerResultados = document.getElementById("container_resultados");
    containerResultados.innerText = "";

    let tds = document.getElementsByTagName("td");
    for (const td of tds) {
        if (eNumerico(td.innerText)) {
            td.style.backgroundColor = corPadrao;
        }
    }
}

function iniciarSorteio()
{
    // O ID é indefinido enquanto nenhum sorteio estiver sendo realizado.
    if (idSetInterval !== undefined) {
        alert("Espere o sorteio atual terminar antes de começar outro!");
        return;
    }

    if (quantidadeCartelas < 1) {
        alert("Crie uma ou mais tabelas antes de começar o sorteio.");
        return;
    }

    if (!primeiraVez) {
        desfazerSorteio();
    }

    idSetInterval = setInterval(atualizarSorteio, 1000);
    primeiraVez = false;
}

function limparTabelas()
{
    // O ID é indefinido enquanto nenhum sorteio estiver sendo realizado.
    if (idSetInterval !== undefined) {
        alert("Você não pode limpar as tabelas durante o sorteio!");
        return;
    }

    quantidadeCartelas = 0;

    let jogos = document.getElementById("jogos");
    while (jogos.firstChild !== null) {
        jogos.firstChild.remove();
    }
}
