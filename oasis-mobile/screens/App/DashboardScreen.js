import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../config/theme';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Olá, Colaborador!</Text>
      
      {/* Card de Status */}
      <View style={styles.mainCard}>
        <Ionicons name="battery-charging" size={40} color={colors.primary} />
        <Text style={styles.cardTitle}>Bateria Mental: 85%</Text>
        <Text style={styles.cardDesc}>Sua equipe está com energia alta hoje.</Text>
      </View>

      {/* Card Secundário usando a cor de destaque */}
      <View style={[styles.card, { backgroundColor: colors.secondary }]}>
        <Text style={{color: colors.white, fontWeight: 'bold', fontSize: 18}}>Modo Foco</Text>
        <Text style={{color: colors.white}}>Você protegeu 2h sem reuniões hoje.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background, paddingTop: 50 },
  header: { fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 20 },
  mainCard: { backgroundColor: colors.white, padding: 25, borderRadius: 16, alignItems: 'center', marginBottom: 15, elevation: 2 },
  cardTitle: { fontSize: 22, fontWeight: 'bold', color: colors.textDark, marginTop: 10 },
  cardDesc: { color: colors.accentGrey, marginTop: 5 },
  card: { padding: 20, borderRadius: 16, elevation: 2 }
});