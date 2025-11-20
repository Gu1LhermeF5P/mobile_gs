import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions, ActivityIndicator } from 'react-native';
import { colors } from '../../config/theme';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import { useIsFocused } from '@react-navigation/native';
import { LineChart } from "react-native-chart-kit";
import { useAuth } from '../../contexts/AuthContext'; // <--- IMPORTANTE

export default function DashboardScreen({ navigation }) {
  const { user } = useAuth(); // <--- Pegamos o ID do usuário aqui
  const isFocused = useIsFocused();
  
  const [risco, setRisco] = useState('Calculando...');
  const [corRisco, setCorRisco] = useState(colors.primary);
  const [mensagem, setMensagem] = useState('Carregando dados...');
  const [loading, setLoading] = useState(false);
  
  const [labelsGrafico, setLabelsGrafico] = useState(["-", "-", "-"]);
  const [dadosGrafico, setDadosGrafico] = useState([3, 3, 3]);

  const calcularBurnout = async () => {
    if (!user || !user.id) return;

    setLoading(true);
    try {
      // MUDANÇA CRÍTICA: Busca dados ESPECÍFICOS deste usuário
      const res = await api.get(`/humor/${user.id}`);
      const dados = res.data; // O backend devolve a lista

      if (dados.length === 0) {
        setRisco("Sem dados");
        setMensagem("Use o Diário para gerar sua análise.");
        setCorRisco(colors.textLight);
        setDadosGrafico([3]); // Reset gráfico
        setLabelsGrafico(["Hoje"]);
        return;
      }

      // 1. Contar dias ruins (Nível 1 ou 2)
      const diasRuins = dados.filter(item => item.nivel <= 2).length;

      // 2. Média
      const soma = dados.reduce((acc, item) => acc + item.nivel, 0);
      const media = soma / dados.length;

      console.log(`Dashboard - Usuário: ${user.nome} | Média: ${media.toFixed(2)} | Ruins: ${diasRuins}`);

      // 3. Diagnóstico
      if (media >= 4) {
        setRisco("Baixo Risco");
        setCorRisco("#4CAF50"); 
        setMensagem("Sua saúde mental está ótima!");
      } else if (media >= 2.5) {
        setRisco("Atenção Moderada");
        setCorRisco("#FF9800");
        setMensagem(`Oscilações recentes. Você teve ${diasRuins} dias difíceis.`);
      } else {
        setRisco("ALTO RISCO");
        setCorRisco("#D32F2F");
        setMensagem("Cuidado! Níveis críticos de exaustão.");

        // Regra dos 3 dias para travar a tela
        if (diasRuins >= 3) {
          dispararProtocoloEmergencia(diasRuins);
        }
      }

      // 4. Gráfico (Pega os últimos 5 registros para caber na tela)
      // A API Java geralmente retorna do mais antigo pro mais novo. 
      // Se estiver invertido, removemos o .reverse() aqui ou ajustamos o slice.
      const ultimos = dados.slice(Math.max(dados.length - 5, 0));
      
      if (ultimos.length > 0) {
        const values = ultimos.map(item => item.nivel);
        // Cria labels simples (D1, D2...) ou pega a data se tiver formatada
        const labels = ultimos.map((_, index) => `Reg.${index + 1}`);
        
        setDadosGrafico(values);
        setLabelsGrafico(labels);
      }

    } catch (e) {
      console.log("Erro Dashboard:", e);
      setMensagem("Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  };

  const dispararProtocoloEmergencia = (qtd) => {
    Alert.alert(
      "🚨 ALERTA DE SAÚDE",
      `Identificamos ${qtd} registros de exaustão severa.\n\nO sistema iniciará uma pausa obrigatória.`,
      [
        { 
          text: "RESPIRAR AGORA", 
          onPress: () => navigation.navigate('Respirar'),
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  useEffect(() => { 
    if(isFocused && user) {
      calcularBurnout(); 
    }
  }, [isFocused, user]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Análise de Burnout</Text>
      
      {/* CARD STATUS */}
      <View style={[styles.cardMain, { borderLeftColor: corRisco }]}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={styles.cardLabel}>Diagnóstico IA</Text>
          {corRisco === '#D32F2F' && <Ionicons name="warning" size={24} color="#D32F2F" />}
        </View>
        
        {loading ? (
          <ActivityIndicator color={colors.primary} style={{marginVertical: 10}}/>
        ) : (
          <>
            <Text style={[styles.riskTitle, { color: corRisco }]}>{risco}</Text>
            <Text style={styles.cardDesc}>{mensagem}</Text>
          </>
        )}
      </View>

      {/* GRÁFICO */}
      <Text style={styles.sectionHeader}>Tendência Emocional</Text>
      <View style={styles.chartContainer}>
        {dadosGrafico.length > 0 ? (
          <LineChart
            data={{
              labels: labelsGrafico,
              datasets: [{ data: dadosGrafico }]
            }}
            width={Dimensions.get("window").width - 40} 
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            fromZero={true}
            segments={5}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => corRisco,
              labelColor: (opacity = 1) => colors.textLight,
              style: { borderRadius: 16 },
              propsForDots: { r: "6", strokeWidth: "2", stroke: corRisco },
              fillShadowGradient: corRisco,
              fillShadowGradientOpacity: 0.2,
            }}
            bezier
            style={{ marginVertical: 8, borderRadius: 16, paddingRight: 40 }}
          />
        ) : (
          <Text style={{padding: 20, color: colors.textLight}}>Sem dados suficientes</Text>
        )}
      </View>

      <Text style={styles.sectionHeader}>Recomendações</Text>
      <View style={styles.grid}>
        <View style={styles.cardSmall}>
          <Ionicons name="timer-outline" size={30} color={colors.primary} />
          <Text style={styles.smallTitle}>Pausas</Text>
          <Text style={styles.smallDesc}>Programe 5min</Text>
        </View>
        <View style={styles.cardSmall}>
          <Ionicons name="call-outline" size={30} color={colors.secondary} />
          <Text style={styles.smallTitle}>Apoio</Text>
          <Text style={styles.smallDesc}>Canal de Ajuda</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: colors.background, paddingTop: 50, paddingBottom: 40 },
  header: { fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 20 },
  cardMain: { backgroundColor: '#FFF', padding: 20, borderRadius: 15, marginBottom: 25, elevation: 3, borderLeftWidth: 8 },
  cardLabel: { fontSize: 12, color: colors.textLight, textTransform: 'uppercase', marginBottom: 5 },
  riskTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  cardDesc: { fontSize: 15, color: colors.text },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 15, marginTop: 10 },
  chartContainer: { backgroundColor: '#FFF', borderRadius: 16, padding: 10, elevation: 2, marginBottom: 25, alignItems: 'center' },
  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  cardSmall: { backgroundColor: '#FFF', width: '48%', padding: 15, borderRadius: 15, elevation: 2, alignItems: 'center', justifyContent: 'center' },
  smallTitle: { fontWeight: 'bold', marginTop: 5, color: colors.text },
  smallDesc: { fontSize: 12, textAlign: 'center', color: colors.textLight }
});