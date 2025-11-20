import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../config/theme';

export default function PerfilScreen({ navigation }) {
  const { signOut, user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      <Text style={styles.email}>{user?.email}</Text>
      
      <View style={styles.btnContainer}>
        <Button 
          title="Sobre o App" 
          onPress={() => navigation.navigate('Sobre')} 
          color={colors.primary}
        />
      </View>

      <View style={styles.btnContainer}>
        <Button title="Sair da Conta" color={colors.error} onPress={signOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.textDark, marginBottom: 10 },
  email: { fontSize: 16, color: colors.accentGrey, marginBottom: 40 },
  btnContainer: { width: '100%', marginBottom: 15 }
});