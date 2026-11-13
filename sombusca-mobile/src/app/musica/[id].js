// app/musica/[id].js — TELA 2: detalhes de uma música.
// Os colchetes no nome do arquivo criam uma ROTA DINÂMICA: /musica/713691774, /musica/123...
// O valor que estiver no lugar de [id] chega na tela como parâmetro.

// useEffect roda código quando a tela aparece; useState guarda dados
import { useEffect, useState } from 'react';
// Componentes nativos usados nesta tela
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
// Stack (para mudar o título do cabeçalho) e o hook que lê os parâmetros da rota
import { Stack, useLocalSearchParams } from 'expo-router';
// Nosso componente de estado
import Estado from '../../components/Estado';
// Funções da API
import { buscarMusicaPorId, capaGrande } from '../../services/itunes';
// Tema
import { cores, espaco, raio } from '../../theme';

// Converte milissegundos em "m:ss" (ex.: 301000 → "5:01")
function formatarDuracao(ms) {
  // Total de segundos
  const total = Math.round(ms / 1000);
  // Minutos inteiros
  const minutos = Math.floor(total / 60);
  // Segundos restantes, sempre com 2 dígitos ("5" vira "05")
  const segundos = String(total % 60).padStart(2, '0');
  // Monta o texto final
  return `${minutos}:${segundos}`;
}

// Componente da tela de detalhes
export default function TelaDetalhes() {
  // Lê o "id" da URL (o que veio no lugar de [id])
  const { id } = useLocalSearchParams();
  // A música carregada (null enquanto não chegou)
  const [musica, setMusica] = useState(null);
  // Estado da tela: 'carregando' | 'erro' | 'sucesso'
  const [estado, setEstado] = useState('carregando');
  // Contador usado para refazer a busca ao tocar em "Tentar de novo"
  const [tentativa, setTentativa] = useState(0);

  // useEffect: roda quando a tela abre e sempre que "id" ou "tentativa" mudarem
  useEffect(() => {
    // Marca se a tela ainda está aberta (evita atualizar uma tela que já foi fechada)
    let ativo = true;
    // Mostra o carregando
    setEstado('carregando');
    // Chama a API (Promise com .then/.catch, outra forma de lidar com código assíncrono)
    buscarMusicaPorId(id)
      // Quando a resposta chegar...
      .then((resultado) => {
        // ...se o usuário já voltou para a tela anterior, não faz nada
        if (!ativo) return;
        // Guarda a música
        setMusica(resultado);
        // Se não achou, é erro; se achou, sucesso
        setEstado(resultado ? 'sucesso' : 'erro');
      })
      // Se a requisição falhar, mostra o erro
      .catch(() => ativo && setEstado('erro'));
    // Função de "limpeza": roda quando a tela fecha
    return () => {
      // Marca que a tela não está mais ativa
      ativo = false;
    };
    // Lista de dependências: o efeito roda de novo se algum destes mudar
  }, [id, tentativa]);

  // Enquanto carrega, mostra só o indicador
  if (estado === 'carregando') {
    return <Estado tipo="carregando" mensagem="Carregando música…" />;
  }

  // Se deu erro, mostra a mensagem com a opção de tentar de novo
  if (estado === 'erro') {
    return (
      <Estado
        tipo="erro"
        mensagem="Não foi possível carregar esta música."
        onTentarDeNovo={() => setTentativa((n) => n + 1)}
      />
    );
  }

  // Ano de lançamento: pega os 4 primeiros caracteres da data ("2013-05-17T..." → "2013")
  const ano = musica.releaseDate?.slice(0, 4);

  // Sucesso: mostra os detalhes
  return (
    // ScrollView: deixa rolar a tela se o conteúdo for maior que ela
    <ScrollView contentContainerStyle={estilos.conteudo}>
      {/* Troca o título do cabeçalho pelo nome da música */}
      <Stack.Screen options={{ title: musica.trackName }} />
      {/* Capa grande; accessibilityLabel descreve a imagem para o leitor de tela */}
      <Image
        source={{ uri: capaGrande(musica, 600) }}
        style={estilos.capa}
        accessibilityLabel={`Capa do álbum ${musica.collectionName}`}
      />
      {/* Nome da música; role "header" = é um título para o leitor de tela */}
      <Text style={estilos.titulo} accessibilityRole="header">
        {musica.trackName}
      </Text>
      {/* Nome do artista */}
      <Text style={estilos.artista}>{musica.artistName}</Text>

      {/* Cartão com as informações em linhas "rótulo: valor" */}
      <View style={estilos.cartao}>
        <Info rotulo="Álbum" valor={musica.collectionName} />
        <Info rotulo="Gênero" valor={musica.primaryGenreName} />
        <Info rotulo="Ano" valor={ano} />
        <Info rotulo="Duração" valor={formatarDuracao(musica.trackTimeMillis)} />
      </View>

      {/* Botão que abre a música no Apple Music (app ou navegador) */}
      <Pressable
        // Linking.openURL abre um link fora do app
        onPress={() => Linking.openURL(musica.trackViewUrl)}
        // Anunciado como link
        accessibilityRole="link"
        // Feedback ao pressionar
        style={({ pressed }) => [estilos.botao, pressed && { opacity: 0.7 }]}
      >
        {/* Texto do botão */}
        <Text style={estilos.textoBotao}>Ouvir no Apple Music</Text>
      </Pressable>
    </ScrollView>
  );
}

// Componente pequeno, usado só nesta tela: uma linha "rótulo — valor"
function Info({ rotulo, valor }) {
  // Se a API não mandou esse dado, não mostra a linha
  if (!valor) return null;
  // Linha com o rótulo à esquerda e o valor à direita
  return (
    <View style={estilos.linhaInfo}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <Text style={estilos.valor}>{valor}</Text>
    </View>
  );
}

// Estilos da tela
const estilos = StyleSheet.create({
  // Conteúdo da rolagem
  conteudo: {
    // Espaço em volta
    padding: espaco.g,
    // Espaço entre os blocos
    gap: espaco.m,
    // Espaço extra no fim para o botão não colar na borda
    paddingBottom: espaco.gg * 2,
  },
  // Capa grande
  capa: {
    // Ocupa toda a largura disponível
    width: '100%',
    // Altura igual à largura: quadrada
    aspectRatio: 1,
    // Cantos arredondados
    borderRadius: raio,
    // Cor enquanto carrega
    backgroundColor: cores.superficie,
    // Espaço abaixo
    marginBottom: espaco.m,
  },
  // Nome da música
  titulo: {
    // Grande, é o título da tela
    fontSize: 24,
    // Negrito
    fontWeight: '700',
    // Cor principal
    color: cores.texto,
  },
  // Nome do artista
  artista: {
    // Um pouco menor
    fontSize: 18,
    // Cor secundária
    color: cores.textoSuave,
    // Espaço abaixo
    marginBottom: espaco.m,
  },
  // Cartão de informações
  cartao: {
    // Fundo branco
    backgroundColor: cores.superficie,
    // Cantos arredondados
    borderRadius: raio,
    // Espaço nas laterais
    paddingHorizontal: espaco.g,
  },
  // Uma linha de informação
  linhaInfo: {
    // Rótulo e valor lado a lado
    flexDirection: 'row',
    // Um em cada ponta
    justifyContent: 'space-between',
    // Espaço entre eles
    gap: espaco.g,
    // Espaço acima e abaixo
    paddingVertical: espaco.m + 4,
    // Linha fina separando as informações
    borderBottomWidth: StyleSheet.hairlineWidth,
    // Cor da linha
    borderBottomColor: cores.fundo,
  },
  // Rótulo (ex.: "Álbum")
  rotulo: {
    // Cor secundária
    color: cores.textoSuave,
    // Tamanho
    fontSize: 15,
  },
  // Valor (ex.: "Mais do Mesmo")
  valor: {
    // Ocupa o resto da linha e quebra se for longo
    flexShrink: 1,
    // Alinhado à direita
    textAlign: 'right',
    // Cor principal
    color: cores.texto,
    // Seminegrito
    fontWeight: '600',
    // Tamanho
    fontSize: 15,
  },
  // Botão "Ouvir no Apple Music"
  botao: {
    // Altura confortável
    minHeight: 52,
    // Centraliza na vertical
    justifyContent: 'center',
    // Centraliza na horizontal
    alignItems: 'center',
    // Cor de destaque
    backgroundColor: cores.primaria,
    // Cantos arredondados
    borderRadius: raio,
    // Espaço acima
    marginTop: espaco.g,
  },
  // Texto do botão
  textoBotao: {
    // Cor sobre a primária
    color: cores.textoNaPrimaria,
    // Negrito
    fontWeight: '700',
    // Tamanho
    fontSize: 16,
  },
});
