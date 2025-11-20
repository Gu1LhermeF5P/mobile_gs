import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { colors } from '../../config/theme';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import { useIsFocused } from '@react-navigation/native';

// Recebendo 'navigation' para poder redirecionar
export default function DashboardScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [risco, setRisco] = useState('Calculando...');
  const [corRisco, setCorRisco] = useState(colors.primary);
  const [mensagem, setMensagem] = useState('Analisando seus dados...');

  const calcularBurnout = async () => {
    try {
      const res = await api.get('/humor');
      const dados = res.data;

      if (dados.length === 0) {
        setRisco("Sem dados");
        setMensagem("Use o Diário para gerar análises.");
        setCorRisco(colors.textLight);
        return;
      }

      // Cálculo: Média simples (Soma / Quantidade)
      const soma = dados.reduce((acc, item) => acc + item.nivel, 0);
      const media = soma / dados.length;

      // Lógica de Diagnóstico e Intervenção
      if (media >= 4) {
        
        setRisco("Baixo Risco");
        setCorRisco("#4CAF50"); 
        setMensagem("Sua saúde mental está estável. Continue assim!");
      
      } else if (media >= 2.5) {
        
        setRisco("Atenção Moderada");
        setCorRisco("#FF9800");
        setMensagem("Sinais de cansaço detectados. Tente fazer pausas.");
      
      } else {
        
        setRisco("ALTO RISCO DETECTADO");
        setCorRisco("#D32F2F");
        setMensagem("Padrão crítico de exaustão identificado.");

        
        dispararProtocoloEmergencia();
      }

    } catch (e) {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const dispararProtocoloEmergencia = () => {
    Alert.alert(
      "⚠️ ALERTA DE SAÚDE MENTAL",
      "Identificamos sinais consistentes de Burnout. \n\nRecomendamos fortemente que você procure ajuda profissional ou converse com seu gestor.\n\nVamos iniciar um exercício de respiração agora para acalmar.",
      [
        {
          text: "Iniciar Respiração",
          onPress: () => navigation.navigate('Respirar'), 
          style: "destructive" 
        }
      ],
      { cancelable: false } 
    );
  };

  useEffect(() => { 
    if(isFocused) {
      calcularBurnout(); 
    }
  }, [isFocused]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Monitoramento OASIS</Text>
      
      {/* CARD PRINCIPAL: RISCO DE BURNOUT */}
      <View style={[styles.cardMain, { borderLeftColor: corRisco }]}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={styles.cardLabel}>Status Atual</Text>
          {/* Ícone de alerta se for vermelho */}
          {corRisco === '#D32F2F' && <Ionicons name="warning" size={24} color="#D32F2F" />}
        </View>
        
        <Text style={[styles.riskTitle, { color: corRisco }]}>{risco}</Text>
        <Text style={styles.cardDesc}>{mensagem}</Text>
      </View>

      <Text style={styles.sectionHeader}>Ações Recomendadas</Text>

      <View style={styles.grid}>
        <View style={styles.cardSmall}>
          <Ionicons name="shield-checkmark" size={32} color={colors.primary} />
          <Text style={styles.smallTitle}>Limites</Text>
          <Text style={styles.smallDesc}>Notificações pausadas após 18h</Text>
        </View>
        
        <View style={styles.cardSmall}>
          <Ionicons name="medical" size={32} color={colors.secondary} />
          <Text style={styles.smallTitle}>Ajuda</Text>
          <Text style={styles.smallDesc}>Contatos de psicólogos parceiros</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background, paddingTop: 50 },
  header: { fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 20 },
  cardMain: { 
    backgroundColor: '#FFF', padding: 25, borderRadius: 15, marginBottom: 25, 
    elevation: 4, borderLeftWidth: 8 
  },
  cardLabel: { fontSize: 14, color: colors.textLight, textTransform: 'uppercase' },
  riskTitle: { fontSize: 28, fontWeight: 'bold', marginVertical: 10 },
  cardDesc: { fontSize: 16, color: colors.text },
  sectionHeader: { fontSize: 20, fontWeight: 'bold', color: colors.text, marginBottom: 15 },
  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  cardSmall: { 
    backgroundColor: '#FFF', width: '48%', padding: 20, borderRadius: 15, 
    elevation: 2, alignItems: 'center', justifyContent: 'center' 
  },
  smallTitle: { fontWeight: 'bold', marginTop: 10, color: colors.text },
  smallDesc: { fontSize: 12, textAlign: 'center', color: colors.textLight, marginTop: 5 }
});