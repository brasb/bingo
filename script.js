
function adicionarCartela()
{
    let nome = prompt("Digite o nome do jogador:");
    gerarCartela(nome);
}

function gerarCartela(nome)
{
    const JOGOS = document.getElementById("jogos");

    let jogoDiv = document.createElement("div");
    jogoDiv.setAttribute("class", "jogo");
    JOGOS.appendChild(jogoDiv);

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

    const PRIMEIRA_LINHA = ["B", "I", "N", "G", "O"];
    for (let i = 0; i < 5; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < 5; j++) {
            let td = document.createElement("td");

            td.innerText = i === 0 ? PRIMEIRA_LINHA[j] : 

            tr.appendChild(td);
        }
        tabela.appendChild(tr);
    }
}

function iniciarSorteio() 
{

}
