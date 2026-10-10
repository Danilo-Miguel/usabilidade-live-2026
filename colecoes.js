let numeros = [10, 20, 30, 40, true, "texto"]

console.log(numeros[0])
console.log(numeros[3])


numeros.push(5)
numeros.unshift(1)

numeros.pop();
numeros.shift();

numeros.forEach((numero, index)=>{
  console.log(`${index}: ${numero}`)
})

console.log(numeros.splice(0,3))


let mapa = new Map()
mapa.set("nome", "Carlos")
mapa.set(42,"Numero como chave")
mapa.set(true, "Chave booleana")

console.log(mapa.get("nome"))
console.log(mapa.get(42))

console.log(mapa.has(true))

mapa.forEach((valor, chave)=>{
    console.log(`${chave}: ${valor}`)

})

let conjunto = new Set([1,2,3,4,5,5])
conjunto.add(6)
conjunto.add(6)
conjunto.delete(3)
console.log(conjunto)

conjunto.forEach(valor => console.log(valor))

let pessoa = {
    nome: "João",
    idade: 30,
    profissao: "Programador",
    endereco:{
        rua: "Rua A",
        numero: 123    
    }
}


const jsonString = JSON.stringify(pessoa)
console.log(jsonString)


const jsonData ={"cidade": "São Paulo", "estado": "SP"}
const objeto = JSON.parse(jsonData)
console.log(objeto.cidade)

console.log(pessoa.nome)
console.log(pessoa["idade"])
console.log(pessoa.endereco.rua)

