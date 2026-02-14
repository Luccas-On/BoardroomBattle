import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ReportProps {
  visible: boolean;
  report: { profit: number; bonus: number; total: number } | null;
  onClose: () => void;
}

export default function ProfitReport({ visible, report, onClose }: ReportProps) {
  if (!report) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <MaterialCommunityIcons name="finance" size={48} color="#27ae60" />
          <Text style={styles.title}>BALANÇO TRIMESTRAL</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Dividendos (Market Share):</Text>
            <Text style={styles.val}>R$ {report.profit}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Bônus (Equipe Ativa):</Text>
            <Text style={styles.val}>R$ {report.bonus}</Text>
          </View>
          
          <View style={styles.hr} />
          
          <View style={styles.row}>
            <Text style={styles.totalLabel}>LUCRO LÍQUIDO:</Text>
            <Text style={styles.totalVal}>R$ {report.total}</Text>
          </View>

          <TouchableOpacity style={styles.btn} onPress={onClose}>
            <Text style={styles.btnText}>REINVESTIR CAPITAL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' },
  card: { width: '85%', backgroundColor: '#fff', borderRadius: 20, padding: 25, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50', marginVertical: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical: 5 },
  label: { color: '#95a5a6' },
  val: { fontWeight: 'bold', color: '#2c3e50' },
  hr: { height: 1, backgroundColor: '#eee', width: '100%', marginVertical: 15 },
  totalLabel: { fontWeight: 'bold', color: '#27ae60' },
  totalVal: { fontSize: 22, fontWeight: 'bold', color: '#27ae60' },
  btn: { backgroundColor: '#2ecc71', width: '100%', padding: 15, borderRadius: 12, marginTop: 20, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});