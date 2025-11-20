import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, commitHash } from '../../config/theme';

export default function SobreScreen() {
  
  const openGitHub = (url) => {
    Linking.openURL(url).catch(err => console.error("Erro ao abrir link", err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.headerContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="information" size={40} color={colors.white} />
        </View>
        <Text style={styles.appName}>OÁSIS Mobile</Text>
        <Text style={styles.version}>Versão 1.0.0</Text>
      </View>

      <Text style={styles.description}>
        Plataforma de bem-estar corporativo focada em equilíbrio híbrido e rituais de desconexão.
      </Text>

      {/* CARD LIMPO: Desenvolvedores */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Desenvolvedores</Text>
        
        <TouchableOpacity style={styles.devRow} onPress={() => openGitHub('https://github.com/Gu1LhermeF5P')}>
          <Ionicons name="logo-github" size={24} color={colors.primary} />
          <View style={styles.devInfo}>
            <Text style={styles.devName}>Guilherme</Text>
            <Text style={styles.devLink}>github.com/Gu1LhermeF5P</Text>
          </View>
          <Ionicons name="open-outline" size={20} color={colors.textLight} />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.devRow} onPress={() => openGitHub('https://github.com/LarissaMouraDev')}>
          <Ionicons name="logo-github" size={24} color={colors.primary} />
          <View style={styles.devInfo}>
            <Text style={styles.devName}>Larissa</Text>
            <Text style={styles.devLink}>github.com/LarissaMouraDev</Text>
          </View>
          <Ionicons name="open-outline" size={20} color={colors.textLight} />
        </TouchableOpacity>
      </View>

      {/* CARD LIMPO: Dados da Build */}
      <View style={[styles.card, { marginTop: 20 }]}>
        <Text style={styles.sectionTitle}>Dados da Build</Text>
        <Text style={styles.label}>Hash do Commit:</Text>
        <View style={styles.hashBox}>
          <Text style={styles.hashText}>{commitHash}</Text>
        </View>
      </View>

      {/* Rodapé Atualizado */}
      <Text style={styles.footer}>© 2025 Oasis</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: colors.background, alignItems: 'center' },
  headerContainer: { alignItems: 'center', marginBottom: 20, marginTop: 10 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  appName: { fontSize: 28, fontWeight: 'bold', color: colors.primary },
  version: { fontSize: 14, color: colors.textLight, marginTop: 5 },
  description: { fontSize: 16, color: colors.text, textAlign: 'center', marginBottom: 30, paddingHorizontal: 10 },
  
  // CARD ATUALIZADO (Sem a sombra cinza feia)
  card: { 
    width: '100%', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 16, 
    padding: 20, 
    borderWidth: 1,
    borderColor: '#F0F0F0' // Borda bem sutil no lugar da sombra
  },
  
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 15 },
  devRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  devInfo: { flex: 1, marginLeft: 15 },
  devName: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  devLink: { fontSize: 12, color: colors.textLight },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 10 },
  label: { fontSize: 14, color: colors.textLight, fontWeight: '600' },
  hashBox: { backgroundColor: '#F9F9F9', padding: 12, borderRadius: 8, marginTop: 8, alignItems: 'center' },
  hashText: { fontFamily: 'monospace', color: colors.secondary, fontWeight: 'bold' },
  footer: { marginTop: 30, color: colors.textLight, fontSize: 12 }
});