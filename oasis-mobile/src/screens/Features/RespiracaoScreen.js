import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../config/theme';

export default function RespiracaoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pausa para Descompressão</Text>
      <View style={styles.circle}>
        <Text style={styles.text}>Inspire...</Text>
      </View>
      <Text style={{color: colors.accentGrey, marginTop: 20}}>Ciclo de 4 segundos</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  title: { fontSize: 24, color: colors.primary, fontWeight: 'bold', marginBottom: 40 },
  circle: { width: 200, height: 200, borderRadius: 100, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  text: { color: colors.white, fontSize: 22, fontWeight: 'bold' }
});