// src/components/ContadorClasse.jsx — class component (bloco 7 da aula).
// Equivalente funcional, para comparar:
//   const [contador, setContador] = useState(inicial)
//   <button onClick={() => setContador((c) => c + 1)}>+1</button>
import { Component } from 'react'

export class ContadorClasse extends Component {
  constructor(props) {
    super(props) // obrigatório: inicializa this.props
    // ?? usa 0 apenas se props.inicial for null/undefined. O state é SEMPRE um objeto.
    this.state = { contador: props.inicial ?? 0 }
    // Solução 1 para o this: bind no constructor (forma clássica).
    // Sem isso, onClick={this.incrementar} chamaria a função "solta" e this seria undefined.
    this.incrementar = this.incrementar.bind(this)
  }

  incrementar() {
    // setState faz MERGE com o objeto de state (o set do useState SUBSTITUI o valor).
    this.setState((anterior) => ({ contador: anterior.contador + 1 }))
  }

  // Solução 2: arrow function como propriedade da classe. Ela herda o this, sem bind.
  zerar = () => {
    this.setState({ contador: 0 })
  }

  // Toda classe precisa de render(), que retorna o JSX.
  render() {
    return (
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold">{this.state.contador}</span>
        <button onClick={this.incrementar} className="px-3 py-1 rounded bg-pink-500">+1</button>
        <button onClick={this.zerar} className="px-3 py-1 rounded bg-zinc-700">Zerar</button>
        <small className="text-zinc-400">{this.props.rotulo}</small>
      </div>
    )
  }
}
