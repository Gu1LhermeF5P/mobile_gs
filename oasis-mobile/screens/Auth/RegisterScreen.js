import React from 'react';
import { View, Text, Button } from 'react-native';
export default function RegisterScreen({ navigation }) {
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>Tela de Cadastro (Placeholder)</Text>
      <Button title="Voltar ao Login" onPress={() => navigation.goBack()} />
    </View>
  );
}