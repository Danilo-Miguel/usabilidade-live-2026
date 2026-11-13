// components/MusicaCard.js — cartão de UMA música na lista de resultados.
// É um componente reutilizável: recebe os dados por props e avisa o clique por onPress.

// Importa os componentes nativos do React Native que este cartão usa
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
// Importa as cores, espaços e raio do tema
import { cores, espaco, raio } from '../theme';
// Importa a função que gera a URL da capa em tamanho maior
import { capaGrande } from '../services/itunes';

// O componente recebe duas props: os dados da música e a função chamada ao tocar
export default function MusicaCard({ musica, onPress }) {
  // Retorna o que deve aparecer na tela
  return (
    // Pressable = área que responde ao toque (equivale a um <button> da web)
    <Pressable
      // Função executada quando o usuário toca no cartão
      onPress={onPress}
      // Diz ao leitor de tela que isto é um botão
      accessibilityRole="button"
      // Texto que o leitor de tela fala (TalkBack no Android, VoiceOver no iOS)
      accessibilityLabel={`${musica.trackName}, de ${musica.artistName}. Ver detalhes`}
      // style pode ser uma função: "pressed" é true enquanto o dedo está em cima (feedback, H1)
      style={({ pressed }) => [estilos.cartao, pressed && estilos.pressionado]}
    >
      {/* Image precisa de largura e altura; "uri" é uma imagem da internet */}
      <Image source={{ uri: capaGrande(musica, 200) }} style={estilos.capa} />
      {/* View = caixa de layout (equivale a uma <div>) com os textos */}
      <View style={estilos.textos}>
        {/* Todo texto em React Native precisa estar dentro de <Text>; numberOfLines corta com "…" */}
        <Text style={estilos.titulo} numberOfLines={2}>
          {musica.trackName}
        </Text>
        {/* Artista e álbum, em cor mais suave (hierarquia visual) */}
        <Text style={estilos.info} numberOfLines={1}>
          {musica.artistName} · {musica.collectionName}
        </Text>
      </View>
      {/* Seta indicando que o cartão leva a outra tela; o leitor de tela ignora (é decorativa) */}
      <Text style={estilos.seta} importantForAccessibility="no" accessibilityElementsHidden>
        ›
      </Text>
    </Pressable>
  );
}

// StyleSheet.create organiza os estilos. Parece CSS, mas é objeto JS: camelCase e números sem "px"
const estilos = StyleSheet.create({
  // Estilo do cartão inteiro
  cartao: {
    // Coloca capa, textos e seta lado a lado (no React Native o padrão é coluna)
    flexDirection: 'row',
    // Centraliza os itens na vertical
    alignItems: 'center',
    // Espaço entre capa, textos e seta
    gap: espaco.g,
    // Espaço interno do cartão
    padding: espaco.m,
    // Altura mínima de 72: área de toque bem maior que os 48 recomendados
    minHeight: 72,
    // Fundo branco
    backgroundColor: cores.superficie,
    // Cantos arredondados
    borderRadius: raio,
  },
  // Aparência enquanto o dedo pressiona o cartão
  pressionado: {
    // Fica levemente transparente, mostrando que o toque foi reconhecido
    opacity: 0.7,
  },
  // Capa do álbum
  capa: {
    // Largura de 64 (unidade = "dp", pixels independentes de densidade da tela)
    width: 64,
    // Altura igual: capa quadrada
    height: 64,
    // Cantos arredondados um pouco menores que os do cartão
    borderRadius: 8,
    // Cor de fundo enquanto a imagem carrega
    backgroundColor: cores.fundo,
  },
  // Bloco com título e info
  textos: {
    // flex: 1 = ocupa todo o espaço que sobrar na linha
    flex: 1,
    // Pequeno espaço entre título e info
    gap: espaco.p,
  },
  // Nome da música
  titulo: {
    // Tamanho da fonte
    fontSize: 16,
    // Seminegrito
    fontWeight: '600',
    // Cor do texto principal
    color: cores.texto,
  },
  // Artista · Álbum
  info: {
    // Um pouco menor que o título
    fontSize: 14,
    // Cor secundária
    color: cores.textoSuave,
  },
  // Seta "›"
  seta: {
    // Seta grande para ser bem visível
    fontSize: 28,
    // Cor secundária, sem competir com o conteúdo
    color: cores.textoSuave,
    // Espaço à direita
    paddingRight: espaco.m,
  },
});
