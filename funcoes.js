// Função Declarativa (Tradicional)

saudacao()

function saudacao(nome) {
    return `Olá, ${nome}!`;
}

console.log(saudacao("Danilo")); // "Olá, Alice!"


// Função Anônima (Expressão de Função)


const soma = function(a, b) {
    return a + b;
};

console.log(soma(5, 3)); // 8

// Arrow Function (=>)

    

const multiplicar = (a, b) => a * b;

console.log(multiplicar(4, 2)); // 8

// Função com Parâmetros Padrão


function cumprimentar(nome = "Visitante") {
    return `Bem vindo, ${nome}!`;
}

console.log(cumprimentar());       // "Bem-vindo, Visitante!"
console.log(cumprimentar("João")); // "Bem-vindo, João!"

// Função Autoexecutável (IIFE - Immediately Invoked Function Expression)


(function() {
    console.log("Eu sou uma função que se executa imediatamente!");
})();


// Função Callback

function processar(valor, callback) {
    console.log("Processando...");
    callback(valor);
}

processar(10, (num) => console.log(`Resultado: ${num * 2}`));


//  Função Assíncrona com async/await
async function obterDados() {
    return "Dados recebidos!";
}

obterDados().then(console.log);

