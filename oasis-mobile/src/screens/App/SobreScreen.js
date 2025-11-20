import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, commitHash } from '../../config/theme';

export default function SobreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Cabeçalho com Ícone */}
      <View style={styles.headerContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="information" size={40} color={colors.white} />
        </View>
        <Text style={styles.appName}>OÁSIS Mobile</Text>
        <Text style={styles.version}>Versão 1.0.0 (Beta)</Text>
      </View>

      {/* Descrição */}
      <Text style={styles.description}>
        O OÁSIS é uma plataforma de bem-estar corporativo focada em criar rituais de desconexão e proteger o foco no trabalho híbrido.
      </Text>

      {/* Dados Técnicos (Requisito da Avaliação) */}
      <View style={styles.techCard}>
        <Text style={styles.sectionTitle}>Dados da Build</Text>
        
        <View style={styles.row}>
          <Text style={styles.label}>Desenvolvedor:</Text>
          <Text style={styles.value}>Seu Nome / RM</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Tecnologia:</Text>
          <Text style={styles.value}>React Native + Expo</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.label}>Hash do Commit (Ref):</Text>
        <View style={styles.hashBox}>
          <Text style={styles.hashText}>{commitHash || 'dev-local'}</Text>
        </View>
      </View>

      <Text style={styles.footer}>© 2025 Equilíbrio Híbrido Inteligente</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  version: {
    fontSize: 14,
    color: colors.accentGrey,
    marginTop: 5,
  },
  description: {
    fontSize: 16,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  techCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: colors.accentGrey,
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 15,
  },
  hashBox: {
    backgroundColor: '#F5F7FA',
    padding: 10,
    borderRadius: 6,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  hashText: {
    fontFamily: 'monospace', // Fonte estilo código
    color: colors.secondary,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    color: colors.accentGrey,
    fontSize: 12,
  },
});