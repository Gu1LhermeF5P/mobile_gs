import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../config/theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const { signIn, loading } = useAuth();

  return (
    <View style={styles.container}>
      {/* Usando a cor primária do logo */}
      <Text style={styles.logo}>OÁSIS</Text>
      <Text style={styles.subtitle}>Equilíbrio Híbrido Inteligente</Text>

      <TextInput 
        placeholder="E-mail corporativo" 
        placeholderTextColor={colors.accentGrey}
        style={styles.input} 
        autoCapitalize="none"
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput 
        placeholder="Senha" 
        placeholderTextColor={colors.accentGrey}
        secureTextEntry 
        style={styles.input} 
      />
      
      <TouchableOpacity style={styles.btn} onPress={() => signIn(email, '123')}>
        {loading ? <ActivityIndicator color={colors.white}/> : <Text style={styles.txt}>ENTRAR</Text>}
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{marginTop: 20}}>
        <Text style={{color: colors.primary, fontWeight: '600'}}>Criar nova conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: colors.background },
  logo: { fontSize: 40, fontWeight: 'bold', color: colors.primary, textAlign: 'center' },
  subtitle: { fontSize: 16, color: colors.accentGrey, textAlign: 'center', marginBottom: 40, marginTop: 5 },
  input: { backgroundColor: colors.white, padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#E0E0E0' },
  btn: { backgroundColor: colors.primary, padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  txt: { color: colors.white, fontWeight: 'bold', fontSize: 16 }
});