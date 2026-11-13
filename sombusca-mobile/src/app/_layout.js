// app/_layout.js — layout RAIZ do Expo Router. É o primeiro arquivo que o app carrega.
// Ele define o "navegador": aqui, uma PILHA (Stack) de telas, como cartas empilhadas.
// Abrir uma tela = empilhar por cima. Voltar = tirar a de cima.

// Stack é o navegador em pilha do Expo Router (usa as telas nativas do Android/iOS por baixo)
import { Stack } from 'expo-router';
// StatusBar controla a barra do topo do celular (hora, bateria, sinal)
import { StatusBar } from 'expo-status-bar';
// Importa as cores do tema
import { cores } from '../theme';

// Todo layout exporta um componente padrão
export default function Layout() {
  // Retorna o navegador
  return (
    // Fragmento <>...</>: agrupa dois elementos sem criar caixa extra na tela
    <>
      {/* style="light" = ícones brancos na barra de status, combinando com o cabeçalho verde */}
      <StatusBar style="light" />
      {/* screenOptions vale para TODAS as telas da pilha (consistência, H4) */}
      <Stack
        screenOptions={{
          // Cor de fundo do cabeçalho
          headerStyle: { backgroundColor: cores.primaria },
          // Cor do título e da seta de voltar
          headerTintColor: cores.textoNaPrimaria,
          // Título em negrito
          headerTitleStyle: { fontWeight: '700' },
          // Cor de fundo de todas as telas
          contentStyle: { backgroundColor: cores.fundo },
        }}
      >
        {/* Configura a tela do arquivo app/index.js (a primeira tela) */}
        <Stack.Screen name="index" options={{ title: 'SomBusca' }} />
        {/* Configura a tela do arquivo app/musica/[id].js; o título real é trocado lá dentro */}
        <Stack.Screen name="musica/[id]" options={{ title: 'Detalhes' }} />
      </Stack>
    </>
  );
}
