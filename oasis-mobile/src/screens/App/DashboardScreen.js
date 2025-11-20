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
  
  // Estados para o Gráfico
  const [labelsGrafico, setLabelsGrafico] = useState(["Seg", "Ter", "Qua", "Qui", "Sex"]);
  const [dadosGrafico, setDadosGrafico] = useState([3, 3, 3, 3, 3]); // Dados iniciais neutros

  const calcularBurnout = async () => {
    try {
      const res = await api.get('/humor');
      const dados = res.data; // O backend traz do mais antigo pro mais novo por padrão? 
      // No PrioridadesScreen invertemos, aqui precisamos da ordem cronológica

      if (dados.length === 0) {
        setRisco("Sem dados");
        setMensagem("Use o Diário para gerar gráficos.");
        return;
      }

      // 1. Lógica do Status (Média)
      const soma = dados.reduce((acc, item) => acc + item.nivel, 0);
      const media = soma / dados.length;

      if (media >= 4) {
        setRisco("Baixo Risco");
        setCorRisco("#4CAF50"); 
        setMensagem("Sua linha de tendência está saudável.");
      } else if (media >= 2.5) {
        setRisco("Atenção Moderada");
        setCorRisco("#FF9800");
        setMensagem("Oscilações detectadas. Monitore sua rotina.");
      } else {
        setRisco("ALTO RISCO");
        setCorRisco("#D32F2F");
        setMensagem("Declínio acentuado. Protocolo de emergência sugerido.");
        
        // Alerta apenas se não tiver sido mostrado recentemente (lógica simples aqui)
        // dispararProtocoloEmergencia(); 
      }

      // 2. Preparar dados para o Gráfico (Pegar os últimos 5 registros)
      // Se tiver menos de 5, pega todos.
      const ultimos = dados.slice(Math.max(dados.length - 5, 0));
      
      const values = ultimos.map(item => item.nivel);
      // Pega apenas o dia da data (ex: 2025-11-20 -> "20")
      // Se sua API retorna data completa, talvez precise ajustar o substring
      const labels = ultimos.map(item => item.data ? item.data.substring(8, 10) : "Dia");

      setDadosGrafico(values);
      setLabelsGrafico(labels);

    } catch (e) {
      console.log(e);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const dispararProtocoloEmergencia = () => {
    Alert.alert(
      "⚠️ ALERTA DE BURNOUT",
      "Sua curva de humor caiu drasticamente. Vamos respirar?",
      [
        { text: "Ir para Respiração", onPress: () => navigation.navigate('Respirar') }
      ]
    );
  };

  useEffect(() => { if(isFocused) calcularBurnout(); }, [isFocused]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Análise de Burnout</Text>
      
      {/* CARD STATUS */}
      <View style={[styles.cardMain, { borderLeftColor: corRisco }]}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={styles.cardLabel}>Diagnóstico IA</Text>
          {corRisco === '#D32F2F' && <Ionicons name="warning" size={24} color="#D32F2F" />}
        </View>
        <Text style={[styles.riskTitle, { color: corRisco }]}>{risco}</Text>
        <Text style={styles.cardDesc}>{mensagem}</Text>
      </View>

      {/* GRÁFICO DE TENDÊNCIA */}
      <Text style={styles.sectionHeader}>Sua Curva Emocional (Últimos Dias)</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: labelsGrafico,
            datasets: [{ data: dadosGrafico }]
          }}
          width={Dimensions.get("window").width - 40} // Largura da tela menos padding
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1}
          fromZero={true}
          segments={5} // Linhas horizontais (1 a 5)
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => corRisco, // A linha muda de cor conforme o risco!
            labelColor: (opacity = 1) => colors.textLight,
            style: { borderRadius: 16 },
            propsForDots: { r: "6", strokeWidth: "2", stroke: corRisco }
          }}
          bezier // Deixa a linha curva (suave)
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
        <Text style={styles.chartLegend}>Escala: 1 (Esgotado) a 5 (Ótimo)</Text>
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
  cardMain: { 
    backgroundColor: '#FFF', padding: 20, borderRadius: 15, marginBottom: 25, 
    elevation: 3, borderLeftWidth: 8 
  },
  cardLabel: { fontSize: 12, color: colors.textLight, textTransform: 'uppercase', marginBottom: 5 },
  riskTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  cardDesc: { fontSize: 15, color: colors.text },
  
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 15, marginTop: 10 },
  
  chartContainer: {
    backgroundColor: '#FFF', borderRadius: 16, padding: 10, elevation: 2, marginBottom: 25, alignItems: 'center'
  },
  chartLegend: { fontSize: 12, color: colors.textLight, marginTop: 5 },

  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  cardSmall: { 
    backgroundColor: '#FFF', width: '48%', padding: 15, borderRadius: 15, 
    elevation: 2, alignItems: 'center', justifyContent: 'center' 
  },
  smallTitle: { fontWeight: 'bold', marginTop: 5, color: colors.text },
  smallDesc: { fontSize: 12, textAlign: 'center', color: colors.textLight }
});