// theme.js — "tokens de design": cores e medidas usadas no app inteiro.
// Mudar uma cor aqui muda em todas as telas (consistência, heurística H4 de Nielsen).

// Exporta um objeto com as cores do app
export const cores = {
  // Fundo das telas: cinza bem claro, cansa menos a vista que branco puro
  fundo: '#F4F6FA',
  // Fundo dos cartões e do campo de busca
  superficie: '#FFFFFF',
  // Texto principal: contraste ≈ 17:1 sobre o fundo (WCAG pede no mínimo 4.5:1)
  texto: '#1A1A1A',
  // Texto secundário (artista, álbum): contraste ≈ 7.5:1 sobre branco
  textoSuave: '#4B5563',
  // Cor de destaque (botões, cabeçalho): verde escuro, contraste ≈ 6.6:1 com branco
  primaria: '#0B6B3A',
  // Texto que fica em cima da cor primária
  textoNaPrimaria: '#FFFFFF',
  // Borda do campo de busca: contraste ≈ 4.8:1, acima dos 3:1 exigidos para componentes
  borda: '#6B7280',
  // Cor de erro: vermelho escuro, contraste ≈ 6.5:1 sobre branco
  erro: '#B91C1C',
};

// Exporta os espaçamentos padrão (múltiplos de 4, um padrão comum em design de interfaces)
export const espaco = {
  // Espaço pequeno: entre textos
  p: 4,
  // Espaço médio: entre elementos
  m: 8,
  // Espaço grande: margens das telas
  g: 16,
  // Espaço extra grande: separação de blocos
  gg: 24,
};

// Raio de arredondamento padrão dos cantos
export const raio = 12;
