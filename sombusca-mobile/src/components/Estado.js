// components/Estado.js — mensagem de estado da tela: carregando, vazio ou erro.
// As duas telas usam este mesmo componente (reutilização, consistência H4).

// Importa os componentes nativos usados aqui
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
// Importa o tema
import { cores, espaco, raio } from '../theme';

// Props: "tipo" ('carregando' | 'vazio' | 'erro'), a mensagem e, opcionalmente, a ação de tentar de novo
export default function Estado({ tipo, mensagem, onTentarDeNovo }) {
  // Retorna o bloco de estado
  return (
    // accessibilityLiveRegion: no Android, o leitor de tela anuncia sozinho quando a mensagem muda (H1)
    <View style={estilos.caixa} accessibilityLiveRegion="polite">
      {/* Se estiver carregando, mostra o indicador giratório nativo do sistema */}
      {tipo === 'carregando' && <ActivityIndicator size="large" color={cores.primaria} />}
      {/* A mensagem; no erro ela fica vermelha E com ícone, não só pela cor (WCAG 1.4.1) */}
      <Text style={[estilos.mensagem, tipo === 'erro' && estilos.erro]}>
        {tipo === 'erro' ? '⚠️ ' : ''}
        {mensagem}
      </Text>
      {/* No erro, oferece uma saída: tentar de novo (heurísticas H3 e H9) */}
      {tipo === 'erro' && onTentarDeNovo && (
        // Botão de tentar novamente
        <Pressable
          // Executa a função recebida por props
          onPress={onTentarDeNovo}
          // Leitor de tela anuncia como botão
          accessibilityRole="button"
          // Muda a aparência enquanto é pressionado
          style={({ pressed }) => [estilos.botao, pressed && { opacity: 0.7 }]}
        >
          {/* Texto do botão */}
          <Text style={estilos.textoBotao}>Tentar de novo</Text>
        </Pressable>
      )}
    </View>
  );
}

// Estilos do componente
const estilos = StyleSheet.create({
  // Caixa que envolve o estado
  caixa: {
    // Centraliza o conteúdo na horizontal
    alignItems: 'center',
    // Espaço entre indicador, mensagem e botão
    gap: espaco.g,
    // Espaço em volta
    padding: espaco.gg,
  },
  // Texto da mensagem
  mensagem: {
    // Tamanho confortável de leitura
    fontSize: 16,
    // Cor secundária
    color: cores.textoSuave,
    // Centraliza o texto
    textAlign: 'center',
  },
  // Variação da mensagem quando é erro
  erro: {
    // Vermelho de erro
    color: cores.erro,
  },
  // Botão "Tentar de novo"
  botao: {
    // Altura mínima de 48: tamanho de toque recomendado
    minHeight: 48,
    // Espaço nas laterais
    paddingHorizontal: espaco.gg,
    // Centraliza o texto na vertical
    justifyContent: 'center',
    // Fundo na cor primária
    backgroundColor: cores.primaria,
    // Cantos arredondados
    borderRadius: raio,
  },
  // Texto do botão
  textoBotao: {
    // Cor do texto sobre a primária
    color: cores.textoNaPrimaria,
    // Seminegrito
    fontWeight: '600',
    // Tamanho
    fontSize: 16,
  },
});
