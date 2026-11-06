// src/components/ErrorBoundary.jsx — bônus: o uso "vivo" de classes hoje.
// Capturar erros de renderização dos filhos ainda só é possível com classe.
import { Component } from 'react'

export class ErrorBoundary extends Component {
  state = { temErro: false }

  // O React chama este método quando um filho lança erro ao renderizar;
  // o objeto retornado vira o novo state.
  static getDerivedStateFromError() {
    return { temErro: true }
  }

  render() {
    if (this.state.temErro) {
      return <p className="p-8 text-center text-red-400">Algo deu errado. Recarregue a página.</p>
    }
    // Até a classe usa children: o conceito é o mesmo das funções.
    return this.props.children
  }
}
