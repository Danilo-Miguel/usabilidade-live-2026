// app/index.js — TELA 1: busca de músicas.
// No Expo Router, cada arquivo dentro de app/ vira uma tela. "index" é a rota "/" (a inicial).

// useState guarda dados que, quando mudam, fazem a tela se redesenhar
import { useState } from 'react';
// Componentes nativos usados nesta tela
import { FlatList, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
// useRouter dá acesso às funções de navegação (push, back...)
import { useRouter } from 'expo-router';
// Nossos componentes reutilizáveis
import MusicaCard from '../components/MusicaCard';
import Estado from '../components/Estado';
// Função que consulta a API
import { buscarMusicas } from '../services/itunes';
// Tema
import { cores, espaco, raio } from '../theme';

// Componente da tela de busca
export default function TelaBusca() {
  // Objeto de navegação
  const router = useRouter();
  // Texto digitado no campo (começa vazio)
  const [termo, setTermo] = useState('');
  // Lista de músicas recebida da API (começa vazia)
  const [musicas, setMusicas] = useState([]);
  // Estado da tela: 'inicio' | 'carregando' | 'vazio' | 'erro' | 'sucesso'
  const [estado, setEstado] = useState('inicio');
  // Termo da última busca feita (não muda se o usuário editar o campo depois)
  const [buscado, setBuscado] = useState('');

  // Função que faz a busca; async porque espera a API
  async function buscar() {
    // Tira espaços do começo e do fim
    const texto = termo.trim();
    // Prevenção de erro (H5): não busca se o campo estiver vazio
    if (!texto) return;
    // Fecha o teclado para o usuário ver os resultados
    Keyboard.dismiss();
    // Guarda o termo buscado para usar na mensagem de "nada encontrado"
    setBuscado(texto);
    // Estado 1: carregando (H1, visibilidade do status)
    setEstado('carregando');
    // try/catch: se algo falhar, cai no catch em vez de travar o app
    try {
      // Chama a API e espera a lista
      const resultado = await buscarMusicas(texto);
      // Guarda a lista no estado (a tela se redesenha com ela)
      setMusicas(resultado);
      // Estado 2 ou 3: vazio se não veio nada, sucesso se veio
      setEstado(resultado.length === 0 ? 'vazio' : 'sucesso');
    } catch {
      // Estado 4: erro (sem internet, API fora do ar...)
      setEstado('erro');
    }
  }

  // Função chamada ao tocar em uma música: abre a tela de detalhes
  function abrirDetalhes(musica) {
    // Empilha a rota /musica/[id], trocando [id] pelo id real da música
    router.push({ pathname: '/musica/[id]', params: { id: musica.trackId } });
  }

  // O que a tela mostra
  return (
    // View raiz ocupando a tela toda (flex: 1)
    <View style={estilos.tela}>
      {/* Bloco de busca */}
      <View style={estilos.busca}>
        {/* Rótulo sempre visível: não some como o placeholder (H6) */}
        <Text style={estilos.rotulo} nativeID="rotuloBusca">
          Nome do artista ou música
        </Text>
        {/* Linha com o campo e o botão lado a lado */}
        <View style={estilos.linha}>
          {/* TextInput = campo de texto (equivale ao <input> da web) */}
          <TextInput
            // Valor exibido vem do estado (componente "controlado")
            value={termo}
            // A cada letra digitada, atualiza o estado
            onChangeText={setTermo}
            // Ao tocar em "buscar" no teclado, faz a busca (eficiência, H7)
            onSubmitEditing={buscar}
            // Mostra a tecla "Buscar"/lupa no teclado do celular
            returnKeyType="search"
            // Texto de exemplo dentro do campo
            placeholder="Ex.: Legião Urbana"
            // Cor do placeholder com contraste suficiente
            placeholderTextColor={cores.textoSuave}
            // Não corrige o texto automaticamente (nomes de artistas são "estranhos")
            autoCorrect={false}
            // Liga o campo ao rótulo para o leitor de tela (Android)
            accessibilityLabelledBy="rotuloBusca"
            // Rótulo falado pelo leitor de tela (iOS e Android)
            accessibilityLabel="Nome do artista ou música"
            // Estilo do campo
            style={estilos.campo}
          />
          {/* Botão de buscar */}
          <Pressable
            // Faz a busca ao tocar
            onPress={buscar}
            // Anunciado como botão
            accessibilityRole="button"
            // Feedback visual ao pressionar
            style={({ pressed }) => [estilos.botao, pressed && { opacity: 0.7 }]}
          >
            {/* Texto do botão */}
            <Text style={estilos.textoBotao}>Buscar</Text>
          </Pressable>
        </View>
      </View>

      {/* Mostra um estado diferente conforme a variável "estado" */}
      {estado === 'inicio' && (
        <Estado tipo="vazio" mensagem="Digite um artista e toque em Buscar." />
      )}
      {estado === 'carregando' && <Estado tipo="carregando" mensagem="Buscando músicas…" />}
      {estado === 'vazio' && (
        <Estado tipo="vazio" mensagem={`Nenhuma música encontrada para “${buscado}”.`} />
      )}
      {estado === 'erro' && (
        <Estado
          tipo="erro"
          mensagem="Não foi possível buscar agora. Verifique sua internet."
          onTentarDeNovo={buscar}
        />
      )}

      {/* FlatList: lista otimizada, só desenha os itens que aparecem na tela */}
      {estado === 'sucesso' && (
        <FlatList
          // Os dados da lista
          data={musicas}
          // Chave única de cada item (como o "key" do .map() no React web)
          keyExtractor={(item) => String(item.trackId)}
          // Como desenhar cada item: um MusicaCard
          renderItem={({ item }) => (
            <MusicaCard musica={item} onPress={() => abrirDetalhes(item)} />
          )}
          // Espaço entre os cartões
          ItemSeparatorComponent={() => <View style={{ height: espaco.m }} />}
          // Texto acima da lista com a quantidade de resultados (H1)
          ListHeaderComponent={
            <Text style={estilos.contagem}>{musicas.length} músicas encontradas</Text>
          }
          // Espaço interno da lista
          contentContainerStyle={estilos.lista}
          // Permite tocar em um item mesmo com o teclado aberto
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}

// Estilos da tela
const estilos = StyleSheet.create({
  // Tela inteira
  tela: {
    // Ocupa todo o espaço disponível
    flex: 1,
  },
  // Bloco de busca no topo
  busca: {
    // Espaço interno
    padding: espaco.g,
    // Espaço entre rótulo e linha
    gap: espaco.m,
    // Fundo branco
    backgroundColor: cores.superficie,
  },
  // Rótulo do campo
  rotulo: {
    // Seminegrito
    fontWeight: '600',
    // Cor principal
    color: cores.texto,
    // Tamanho
    fontSize: 15,
  },
  // Linha com campo + botão
  linha: {
    // Lado a lado
    flexDirection: 'row',
    // Espaço entre eles
    gap: espaco.m,
  },
  // Campo de texto
  campo: {
    // Ocupa o espaço que sobra ao lado do botão
    flex: 1,
    // Altura mínima de toque
    minHeight: 48,
    // Espaço interno nas laterais
    paddingHorizontal: espaco.g,
    // Borda visível (contraste ≥ 3:1)
    borderWidth: 2,
    // Cor da borda
    borderColor: cores.borda,
    // Cantos arredondados
    borderRadius: raio,
    // Tamanho do texto digitado
    fontSize: 16,
    // Cor do texto digitado
    color: cores.texto,
  },
  // Botão Buscar
  botao: {
    // Altura mínima de toque
    minHeight: 48,
    // Espaço nas laterais
    paddingHorizontal: espaco.g,
    // Centraliza o texto na vertical
    justifyContent: 'center',
    // Cor de destaque: ação principal
    backgroundColor: cores.primaria,
    // Cantos arredondados
    borderRadius: raio,
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
  // Espaço interno da lista
  lista: {
    // Espaço em volta dos cartões
    padding: espaco.g,
  },
  // Texto "N músicas encontradas"
  contagem: {
    // Cor secundária
    color: cores.textoSuave,
    // Espaço abaixo
    marginBottom: espaco.m,
  },
});
