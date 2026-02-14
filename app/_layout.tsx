import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useGameStore } from '../src/store/gameStore';

export default function RootLayout() {
  const { startGame } = useGameStore();

  // Inicializa o estado global do jogo assim que o app carrega
  useEffect(() => {
    startGame();
  }, []);

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false, // Remove a barra superior padrão
          animation: 'fade',  // Transição suave entre menu e jogo
        }}
      >
        {/* A primeira tela definida é a que abre primeiro */}
        <Stack.Screen name="index" /> 
        <Stack.Screen name="game" />
      </Stack>
    </SafeAreaProvider>
  );
}