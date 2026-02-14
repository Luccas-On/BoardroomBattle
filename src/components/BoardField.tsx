import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BusinessCard from './BusinessCard';

interface BoardFieldProps {
  cards: any[];
  title: string;
  onCardPress?: (id: string) => void;
  onCardLongPress?: (card: any) => void;
  selectedId?: string | null;
  isBattlePhase?: boolean; // Nova prop para saber se estamos em combate
}

const BoardField = ({ cards, title, onCardPress, onCardLongPress, selectedId, isBattlePhase }: BoardFieldProps) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldTitle}>{title}</Text>
      <View style={styles.slotsContainer}>
        {[0, 1, 2, 3, 4].map((index) => {
          const card = cards[index];
          return (
            <View key={index} style={styles.slot}>
              <TouchableOpacity 
                style={styles.touchArea} 
                onPress={() => card && onCardPress?.(card.id)}
                onLongPress={() => card && onCardLongPress?.(card)}
                delayLongPress={200}
              >
                {card ? (
                  <View style={styles.cardScaleWrapper}>
                    <BusinessCard 
                      {...card} 
                      isSelected={selectedId === card.id}
                      isGlowing={card.isGlowing} // Brilha em Azul
                      isTargetable={card.isTargetable} // Brilha em Vermelho
                    />
                  </View>
                ) : (
                  <View style={styles.emptySlot} />
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: { paddingVertical: 10, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.3)', marginVertical: 5 },
  fieldTitle: { fontSize: 10, fontWeight: 'bold', color: '#95a5a6', marginBottom: 5, textAlign: 'center' },
  slotsContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 100 },
  slot: { width: '18%', height: '100%', justifyContent: 'center', alignItems: 'center' },
  touchArea: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
  cardScaleWrapper: { transform: [{ scale: 0.45 }], width: 150, height: 220, justifyContent: 'center', alignItems: 'center' },
  emptySlot: { width: '90%', height: '80%', borderRadius: 8, borderWidth: 1, borderColor: '#bdc3c7', borderStyle: 'dashed' }
});

export default BoardField;