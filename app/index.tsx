import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function MainMenu() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="office-building" size={80} color="#2c3e50" />
          <Text style={styles.title}>BOARDROOM</Text>
          <Text style={styles.subtitle}>BATTLE</Text>
        </View>

        <View style={styles.menuBox}>
          <TouchableOpacity 
            style={styles.mainButton} 
            onPress={() => router.push('/game')}
          >
            <MaterialCommunityIcons name="clock-check" size={24} color="#fff" />
            <Text style={styles.buttonText}>BATER O PONTO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>MEU DECK</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>v1.0.0 - Modo Carreira</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f6', justifyContent: 'center', alignItems: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 50 },
  title: { fontSize: 42, fontWeight: '900', color: '#2c3e50', letterSpacing: 2 },
  subtitle: { fontSize: 24, fontWeight: '300', color: '#e74c3c', marginTop: -10 },
  menuBox: { width: '80%', gap: 15 },
  mainButton: { 
    backgroundColor: '#27ae60', 
    flexDirection: 'row', 
    padding: 20, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 5
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  secondaryButton: { 
    padding: 15, 
    borderRadius: 12, 
    borderWidth: 2, 
    borderColor: '#bdc3c7', 
    alignItems: 'center' 
  },
  secondaryButtonText: { color: '#7f8c8d', fontWeight: 'bold' },
  footerText: { position: 'absolute', bottom: 30, color: '#bdc3c7', fontSize: 12 }
});