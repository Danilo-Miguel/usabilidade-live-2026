// const cowsay = require("cowsay");

const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Digite o seu nome", (nome) =>{
    console.log(`Ola, ${nome}`);
    rl.close
})

/* console.log(
    cowsay.say({
        text:"DRACAAAARYS",
        f:"vader"
   })
 )
*/

var global = "global"

function exemplo(){
// var nome = "João"
global = "mudei"
}

if(true){
    let nome = "João";
}

// console.log(nome)
let idade = 25

const PI = 3.14
// PI = 3.1459
// console.log(PI)


console.log(alunos)
var alunos = "muitos"

// let nome = prompt("Digite o seu nome")
// alert("Bem vindo" + nome)

let texto = "Texto"
let numero = 7
let numero2  = 4.5
let flag = true
let flag2 = false
let nulo = null
let indefinido = undefined

// String --> número

let num = Number("42")
let float = parseFloat("3.14")
let inteiro = parseInt("10")

// Número String

let str = String(100)
let outraStr  = (56).toString

// Boolean --> Number

console.log(Number(true))
console.log(Number(false))


// String Leteral

let literal  = "isso é um string"
let template = `Olá, ${nome}`

