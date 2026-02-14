import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.42;

// Função movida para fora para evitar o erro "is not a function"
const getDeptColor = (d: string) => {
  switch (d) {
    case 'TI': return '#3498db';
    case 'RH': return '#2ecc71';
    case 'Vendas': return '#f1c40f';
    case 'C-Level': return '#9b59b6';
    default: return '#95a5a6';
  }
};

interface BusinessCardProps {
  name: string;
  dept: string;
  cost: number;
  kpi: number;
  moral: number;
  currentMoral?: number;
  isSelected?: boolean;
  isExhausted?: boolean;
  isGlowing?: boolean;
  isTargetable?: boolean;
  ability: string;
}

const BusinessCard = forwardRef(({ 
  name, dept, cost, kpi, moral, currentMoral, isSelected, isExhausted, isGlowing, isTargetable, ability 
}: BusinessCardProps, ref) => {
  
  const displayMoral = currentMoral !== undefined ? currentMoral : moral;
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.4);

  useEffect(() => {
    if (isGlowing || isTargetable) {
      glowOpacity.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
    } else {
      glowOpacity.value = 0.4;
    }
  }, [isGlowing, isTargetable]);

  useImperativeHandle(ref, () => ({
    animateAttack: (isOpponent: boolean) => {
      const direction = isOpponent ? 60 : -60;
      translateY.value = withSequence(withTiming(direction, { duration: 150 }), withSpring(0));
    }
  }));

  useEffect(() => {
    scale.value = isSelected ? withSpring(1.1) : withSpring(1);
  }, [isSelected]);

  const themeColor = getDeptColor(dept);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
    shadowOpacity: (isGlowing || isTargetable) ? glowOpacity.value : 0,
    shadowColor: isTargetable ? '#e74c3c' : '#3498db',
    elevation: (isGlowing || isTargetable) ? 10 : 0,
    borderColor: isTargetable ? '#e74c3c' : (isGlowing ? '#3498db' : themeColor),
  }));

  return (
    <Animated.View style={[styles.cardContainer, animatedStyle, isExhausted && styles.exhaustedCard]}>
      <View style={[styles.costBadge, { backgroundColor: '#6f4e37' }]}>
        <Text style={styles.costText}>{cost}</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.cardName} numberOfLines={1}>{name}</Text>
        <Text style={[styles.deptText, { color: themeColor }]}>{dept}</Text>
      </View>

      <View style={[styles.illustrationArea, { backgroundColor: themeColor + '10' }]}>
        <MaterialCommunityIcons 
          name={dept === 'TI' ? 'xml' : dept === 'RH' ? 'account-group' : 'briefcase-variant'} 
          size={32} 
          color={themeColor} 
        />
      </View>

      <View style={styles.abilityBox}>
        <Text style={styles.abilityText} numberOfLines={3}>
          {ability || "Sem habilidade."}
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.stat}>
          <MaterialCommunityIcons name="sword" size={12} color="#c0392b" />
          <Text style={styles.statText}>{kpi}</Text>
        </View>
        <View style={styles.stat}>
          <MaterialCommunityIcons name="heart" size={12} color="#27ae60" />
          <Text style={[styles.statText, displayMoral < moral && { color: '#e74c3c' }]}>
            {displayMoral}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  cardContainer: { width: CARD_WIDTH, height: CARD_WIDTH * 1.5, backgroundColor: '#fff', borderRadius: 10, borderWidth: 2.5, padding: 5, shadowRadius: 8, shadowOffset: { width: 0, height: 0 } },
  exhaustedCard: { opacity: 0.6 },
  costBadge: { position: 'absolute', top: -8, right: -8, width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center', zIndex: 20, borderWidth: 1.5, borderColor: '#fff' },
  costText: { color: '#fff', fontWeight: 'bold', fontSize: 10 },
  header: { marginBottom: 2 },
  cardName: { fontSize: 9, fontWeight: 'bold', color: '#2c3e50' },
  deptText: { fontSize: 6, fontWeight: '900', textTransform: 'uppercase' },
  illustrationArea: { height: '35%', borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  abilityBox: { flex: 1, justifyContent: 'center', paddingHorizontal: 2, marginBottom: 3 },
  abilityText: { fontSize: 7.5, color: '#34495e', textAlign: 'center', fontStyle: 'italic', lineHeight: 9 },
  footer: { flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 3 },
  stat: { flexDirection: 'row', alignItems: 'center' },
  statText: { fontSize: 11, fontWeight: 'bold', marginLeft: 2, color: '#2c3e50' },
});

export default BusinessCard;