import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../config/theme';
import { Ionicons } from '@expo/vector-icons';

export default function PerfilScreen({ navigation }) {
  const { signOut, user } = useAuth();

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.email?.[0].toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>Colaborador OASIS</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* Botão: Sobre o App (LIMPO) */}
      <TouchableOpacity 
        style={styles.optionRow} 
        onPress={() => navigation.navigate('Sobre')}
      >
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Ionicons name="information-circle" size={24} color={colors.primary} style={{marginRight: 10}} />
          <Text style={styles.optionText}>Sobre o App</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={colors.textLight} />
      </TouchableOpacity>

      {/* Botão Sair */}
      <TouchableOpacity style={styles.logoutBtn} onPress={signOut}>
        <Text style={styles.logoutText}>SAIR DA CONTA</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  header: { alignItems: 'center', marginBottom: 40, marginTop: 30 },
  avatar: { 
    width: 80, height: 80, borderRadius: 40, 
    justifyContent: 'center', alignItems: 'center', marginBottom: 15, 
    backgroundColor: colors.secondary 
  },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: '#FFF' },
  name: { fontSize: 22, fontWeight: 'bold', color: colors.text },
  email: { fontSize: 14, color: colors.textLight, marginTop: 5 },
  
  // ESTILO NOVO E LIMPO
  optionRow: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 18, borderRadius: 12, marginBottom: 15, 
    backgroundColor: '#FFFFFF', // Fundo puramente branco
    borderWidth: 1,
    borderColor: '#EEEEEE', // Borda super sutil
    // Sem elevation (sombra) para tirar o cinza
  },
  
  optionText: { fontSize: 16, fontWeight: '500', color: colors.text },
  logoutBtn: { marginTop: 20, padding: 15, borderRadius: 12, backgroundColor: '#FFEBEE', alignItems: 'center' },
  logoutText: { color: '#D32F2F', fontWeight: 'bold' }
});