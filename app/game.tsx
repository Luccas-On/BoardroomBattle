import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BoardField from '../src/components/BoardField';
import BusinessCard from '../src/components/BusinessCard';
import ProfitReport from '../src/components/ProfitReport';
import { useGameStore } from '../src/store/gameStore';

export default function GameScreen() {
  const { 
    playerHand, playerField, opponentField, opponentHand, playerCafe, cafeProduction,
    playerMarketShare, opponentMarketShare, selectedCardId, lastReport, 
    playerDeck, opponentDeck, gamePhase, startGame, playCard, selectCard, attackTarget, nextPhase 
  } = useGameStore();

  const [previewCard, setPreviewCard] = useState<any | null>(null);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => { startGame(); }, []);

  // Monitor de Condição de Fim de Jogo
  useEffect(() => {
    if (opponentMarketShare <= 0 && opponentMarketShare !== 30) {
      setShowReport(true);
    } else if (playerMarketShare <= 0 && playerMarketShare !== 30) {
      Alert.alert("FALÊNCIA!", "Sua startup ficou sem recursos ou talentos.", [{ text: "Recomeçar", onPress: startGame }]);
    }
  }, [opponentMarketShare, playerMarketShare]);

  const canAttackFace = () => {
    if (gamePhase !== 'ATTACK' || !selectedCardId) return false;
    const attacker = playerField.find(c => c.id === selectedCardId);
    return !opponentField.length || attacker?.ability.toLowerCase().includes("fura-fila");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        
        <ProfitReport visible={showReport} report={lastReport} onClose={() => { setShowReport(false); startGame(); }} />

        {/* TOPO: OPONENTE */}
        <View style={styles.opponentTopArea}>
          <View style={styles.opponentStatusRow}>
            <View style={styles.deckInfoSmall}>
              <MaterialCommunityIcons name="cards-playing" size={16} color="#fff" />
              <Text style={styles.deckCountText}>{opponentDeck.length}</Text>
            </View>
            <View style={styles.opponentNameTag}>
              <Text style={styles.opponentName}>CONCORRENTE S.A.</Text>
            </View>
            <View style={styles.marketShareBadge}>
              <Text style={styles.shareText}>{opponentMarketShare}%</Text>
            </View>
          </View>
          <View style={styles.opponentHandContainer}>
            {opponentHand.map((_, i) => (
              <View key={i} style={styles.opponentCardWrapper}>
                <View style={styles.cardBack} />
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.opponentHeader, canAttackFace() && styles.targetable]}
          onPress={() => attackTarget(null, true)}
          disabled={gamePhase !== 'ATTACK'}
        >
          {canAttackFace() && <Text style={styles.hintText}>🎯 ALVO LIVRE!</Text>}
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.board} scrollEnabled={false}>
          <BoardField 
            cards={opponentField.map(c => ({ ...c, isTargetable: gamePhase === 'ATTACK' && !!selectedCardId }))} 
            title="OPONENTE" 
            onCardPress={(id) => attackTarget(id, false)} 
            onCardLongPress={setPreviewCard} 
          />
          
          <View style={styles.phaseIndicator}>
             <Text style={styles.phaseText}>
               {gamePhase === 'PLANNING' ? "🔨 PLANEJAMENTO" : gamePhase === 'ATTACK' ? "⚔️ COMBATE" : "⏳ TURNO RIVAL"}
             </Text>
          </View>

          <BoardField 
            cards={playerField.map(c => ({ ...c, isGlowing: gamePhase === 'ATTACK' && !c.exhausted }))} 
            title="SUA EQUIPE" 
            onCardPress={selectCard} 
            onCardLongPress={setPreviewCard} 
            selectedId={selectedCardId} 
          />
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.statusRow}>
            <View style={styles.deckInfo}>
              <MaterialCommunityIcons name="cards-playing-outline" size={24} color="#2c3e50" />
              <Text style={styles.deckCount}>{playerDeck.length}</Text>
            </View>
            <View style={styles.cafeContainer}>
              <Text style={styles.lifeText}>Estabilidade: {playerMarketShare}%</Text>
              <View style={styles.cafeRow}>
                <MaterialCommunityIcons name="coffee" size={22} color="#6f4e37" />
                <Text style={styles.cafeText}>{playerCafe}</Text>
                <Text style={styles.cafeRefill}>+{cafeProduction}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={[styles.btnNext, gamePhase === 'ATTACK' ? styles.btnAttack : styles.btnPlan]} 
              onPress={nextPhase}
              disabled={gamePhase === 'OPPONENT'}
            >
              <Text style={styles.btnText}>
                {gamePhase === 'PLANNING' ? "IR P/ COMBATE" : "FIM TURNO"}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={[styles.handContainer, gamePhase !== 'PLANNING' && { opacity: 0.5 }]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.handContent}>
              {playerHand.map(card => (
                <TouchableOpacity 
                  key={card.id} 
                  onPress={() => setPreviewCard(card)} 
                  disabled={gamePhase !== 'PLANNING'}
                  style={[styles.cardWrapper, (playerCafe >= card.cost && gamePhase === 'PLANNING') && styles.glowHand]}
                >
                  <BusinessCard {...card} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        <Modal visible={!!previewCard} transparent animationType="fade">
          <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setPreviewCard(null)}>
            <View style={styles.previewContent}>
              <View style={{ transform: [{ scale: 1.8 }] }}>
                {previewCard && <BusinessCard {...previewCard} />}
              </View>
              {previewCard && playerHand.find(c => c.id === previewCard.id) && gamePhase === 'PLANNING' && (
                <TouchableOpacity 
                  style={[styles.actionBtn, playerCafe < previewCard.cost && styles.disabledBtn]}
                  onPress={() => { playCard(previewCard.id); setPreviewCard(null); }}
                  disabled={playerCafe < previewCard.cost}
                >
                  <Text style={styles.actionText}>{previewCard.moral > 0 ? "CONTRATAR" : "EXECUTAR"}</Text>
                  <Text style={styles.actionSub}>☕ Custo: {previewCard.cost}</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f3f5' },
  opponentTopArea: { backgroundColor: '#2c3e50', paddingVertical: 5 },
  opponentStatusRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 5 },
  deckInfoSmall: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#34495e', padding: 3, borderRadius: 5 },
  deckCountText: { color: '#fff', fontSize: 10, marginLeft: 3, fontWeight: 'bold' },
  opponentNameTag: { backgroundColor: '#c0392b', paddingHorizontal: 10, paddingVertical: 1, borderRadius: 10 },
  opponentName: { color: '#fff', fontWeight: 'bold', fontSize: 9 },
  marketShareBadge: { backgroundColor: '#f1c40f', paddingHorizontal: 8, borderRadius: 4 },
  shareText: { fontWeight: 'bold', fontSize: 11 },
  opponentHandContainer: { flexDirection: 'row', justifyContent: 'center', height: 35 },
  opponentCardWrapper: { width: 25, height: 35, marginHorizontal: -4, transform: [{ scale: 0.75 }] },
  cardBack: { flex: 1, backgroundColor: '#c0392b', borderRadius: 4, borderWidth: 1, borderColor: '#fff' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' },
  previewContent: { alignItems: 'center', width: '100%' },
  actionBtn: { backgroundColor: '#2ecc71', paddingVertical: 10, paddingHorizontal: 40, borderRadius: 20, marginTop: 100 },
  disabledBtn: { backgroundColor: '#95a5a6' },
  actionText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  actionSub: { color: '#fff', fontSize: 9, textAlign: 'center' },
  opponentHeader: { padding: 4, alignItems: 'center' },
  targetable: { backgroundColor: 'rgba(231, 76, 60, 0.2)', borderWidth: 1, borderColor: '#f1c40f' },
  headerText: { color: '#2c3e50', fontWeight: 'bold', fontSize: 9 },
  hintText: { color: '#e74c3c', fontSize: 9, fontWeight: 'bold' },
  board: { padding: 5 },
  phaseIndicator: { alignItems: 'center', marginVertical: 3, backgroundColor: '#ecf0f1', padding: 4, borderRadius: 6 },
  phaseText: { fontSize: 9, fontWeight: 'bold', color: '#7f8c8d' },
  footer: { backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#ddd' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5 },
  deckInfo: { alignItems: 'center', backgroundColor: '#f1f2f6', padding: 4, borderRadius: 8, minWidth: 40 },
  deckCount: { fontSize: 11, fontWeight: 'bold', color: '#2c3e50' },
  cafeContainer: { alignItems: 'center' },
  cafeRow: { flexDirection: 'row', alignItems: 'center' },
  cafeText: { fontSize: 24, fontWeight: 'bold', color: '#6f4e37', marginLeft: 4 },
  cafeRefill: { fontSize: 8, color: '#27ae60', fontWeight: 'bold', marginLeft: 4 },
  lifeText: { color: '#27ae60', fontWeight: 'bold', fontSize: 9 },
  btnNext: { padding: 10, borderRadius: 8, minWidth: 120, alignItems: 'center' },
  btnPlan: { backgroundColor: '#3498db' },
  btnAttack: { backgroundColor: '#e67e22' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  handContainer: { height: 160, backgroundColor: '#f8f9fa' },
  handContent: { paddingHorizontal: 15, alignItems: 'center' },
  cardWrapper: { marginRight: 8, transform: [{ scale: 0.6 }] },
  glowHand: { shadowColor: '#3498db', shadowOpacity: 0.7, shadowRadius: 6, elevation: 4 }
});