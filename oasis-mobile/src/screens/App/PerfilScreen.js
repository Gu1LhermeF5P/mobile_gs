import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext'; // Importar Tema
import { Ionicons } from '@expo/vector-icons';

export default function PerfilScreen({ navigation }) {
  const { signOut, user } = useAuth();
  const { theme, isDarkMode, toggleTheme } = useTheme(); // Usar Tema

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: theme.secondary }]}>
          <Text style={styles.avatarText}>{user?.email?.[0].toUpperCase()}</Text>
        </View>
        <Text style={[styles.name, { color: theme.text }]}>Colaborador OASIS</Text>
        <Text style={[styles.email, { color: theme.textLight }]}>{user?.email}</Text>
      </View>

      {/* Opção: Modo Escuro */}
      <View style={[styles.optionRow, { backgroundColor: theme.surface }]}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Ionicons name="moon" size={24} color={theme.primary} style={{marginRight: 10}} />
          <Text style={[styles.optionText, { color: theme.text }]}>Modo Escuro</Text>
        </View>
        <Switch 
          value={isDarkMode} 
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: theme.primary }}
          thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
        />
      </View>

      {/* Botão: Sobre o App */}
      <TouchableOpacity 
        style={[styles.optionRow, { backgroundColor: theme.surface }]} 
        onPress={() => navigation.navigate('Sobre')} // NAVEGAÇÃO AQUI
      >
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Ionicons name="information-circle" size={24} color={theme.primary} style={{marginRight: 10}} />
          <Text style={[styles.optionText, { color: theme.text }]}>Sobre o App (Versão)</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={theme.textLight} />
      </TouchableOpacity>

      {/* Botão Sair */}
      <TouchableOpacity style={styles.logoutBtn} onPress={signOut}>
        <Text style={styles.logoutText}>SAIR DA CONTA</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { alignItems: 'center', marginBottom: 30, marginTop: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: '#FFF' },
  name: { fontSize: 20, fontWeight: 'bold' },
  email: { fontSize: 14 },
  optionRow: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 15, borderRadius: 12, marginBottom: 15, elevation: 1 
  },
  optionText: { fontSize: 16, fontWeight: '500' },
  logoutBtn: { marginTop: 20, padding: 15, borderRadius: 12, backgroundColor: '#FFEBEE', alignItems: 'center' },
  logoutText: { color: '#D32F2F', fontWeight: 'bold' }
});