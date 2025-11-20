import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import { colors } from '../../config/theme';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import { useIsFocused } from '@react-navigation/native';
import { LineChart } from "react-native-chart-kit";

export default function DashboardScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [risco, setRisco] = useState('Calculando...');
  const [corRisco, setCorRisco] = useState(colors.primary);
  const [mensagem, setMensagem] = useState('Analisando seus dados...');
  
  const [labelsGrafico, setLabelsGrafico] = useState(["Dia 1", "Dia 2", "Dia 3"]);
  const [dadosGrafico, setDadosGrafico] = useState([3, 3, 3]);

  const calcularBurnout = async () => {
    try {
      const res = await api.get('/humor');
      const dados = res.data;

      if (dados.length === 0) {
        setRisco("Sem dados");
        setMensagem("Use o Diário para gerar gráficos.");
        return;
      }

      // 1. Contar quantos dias foram Ruins (Nível 1 ou 2)
      // Nível 1 = Esgotado | Nível 2 = Triste
      const diasRuins = dados.filter(item => item.nivel <= 2).length;

      // 2. Cálculo da Média
      const soma = dados.reduce((acc, item) => acc + item.nivel, 0);
      const media = soma / dados.length;

      console.log(`Média: ${media.toFixed(2)} | Dias Ruins: ${diasRuins}`);

      // 3. Lógica de Diagnóstico
      if (media >= 4) {
        setRisco("Baixo Risco");
        setCorRisco("#4CAF50"); 
        setMensagem("Sua saúde mental está estável.");
      
      } else if (media >= 2.5) {
        setRisco("Atenção Moderada");
        setCorRisco("#FF9800");
        setMensagem(`Você teve ${diasRuins} dias difíceis recentemente.`);
      
      } else {
        // --- ZONA DE ALTO RISCO (< 2.5) ---
        setRisco("ALTO RISCO");
        setCorRisco("#D32F2F");
        setMensagem("Padrão persistente de exaustão.");
        
        // 🚨 NOVA REGRA: Só dispara a intervenção se tiver 3+ dias ruins
        if (diasRuins >= 3) {
          dispararProtocoloEmergencia(diasRuins);
        }
      }

      // 4. Configurar Gráfico
      const ultimos = dados.slice(Math.max(dados.length - 5, 0));
      const values = ultimos.map(item => item.nivel);
      const labels = ultimos.map((item, index) => `D${index + 1}`);
      
      if(values.length > 0) {
        setDadosGrafico(values);
        setLabelsGrafico(labels);
      }

    } catch (e) {
      console.log(e);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const dispararProtocoloEmergencia = (qtdDias) => {
    Alert.alert(
      "🚨 ALERTA DE BURNOUT",
      `Detectamos ${qtdDias} registros de exaustão emocional.\n\nPara sua segurança, vamos iniciar uma pausa obrigatória agora.`,
      [
        { 
          text: "INICIAR RESPIRAÇÃO", 
          onPress: () => navigation.navigate('Respirar'),
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  useEffect(() => { if(isFocused) calcularBurnout(); }, [isFocused]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Análise de Burnout</Text>
      
      <View style={[styles.cardMain, { borderLeftColor: corRisco }]}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={styles.cardLabel}>Diagnóstico IA</Text>
          {corRisco === '#D32F2F' && <Ionicons name="warning" size={24} color="#D32F2F" />}
        </View>
        <Text style={[styles.riskTitle, { color: corRisco }]}>{risco}</Text>
        <Text style={styles.cardDesc}>{mensagem}</Text>
      </View>

      <Text style={styles.sectionHeader}>Sua Curva Emocional</Text>
      <View style={styles.chartContainer}>
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
      </View>

      <Text style={styles.sectionHeader}>Ações Recomendadas</Text>
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