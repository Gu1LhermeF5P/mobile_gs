import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import { colors } from '../../config/theme';

export default function PrioridadesScreen() {
  const [registros, setRegistros] = useState([]);
  const [comentario, setComentario] = useState('');
  const [nivel, setNivel] = useState(3); // 1 a 5
  const [sentimento, setSentimento] = useState('Normal');

  const carregarDados = async () => {
    try {
      const res = await api.get('/humor');
      // Inverte para mostrar o mais recente primeiro
      setRegistros(res.data.reverse());
    } catch (e) { console.log("Erro ao carregar"); }
  };

  useEffect(() => { carregarDados(); }, []);

  const salvarHumor = async () => {
    if (!comentario) return Alert.alert("Ops", "Escreva uma nota sobre seu dia.");
    try {
      await api.post('/humor', { nivel, sentimento, comentario });
      setComentario('');
      Alert.alert("Registrado", "Seu humor foi salvo no histórico.");
      carregarDados();
    } catch (e) { Alert.alert("Erro", "Falha na API"); }
  };

  const deletar = async (id) => {
    try { await api.delete(`/humor/${id}`); carregarDados(); } catch(e){}
  };

  // Emojis para seleção
  const emocoes = [
    { val: 1, label: 'Esgotado', icon: 'thunderstorm' },
    { val: 2, label: 'Triste', icon: 'rainy' },
    { val: 3, label: 'Normal', icon: 'cloudy' },
    { val: 4, label: 'Bem', icon: 'partly-sunny' },
    { val: 5, label: 'Ótimo', icon: 'sunny' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diário de Emoções</Text>
      <Text style={styles.subtitle}>Como você se sentiu hoje?</Text>

      {/* Seletor de Emojis */}
      <View style={styles.emojiContainer}>
        {emocoes.map((item) => (
          <TouchableOpacity 
            key={item.val} 
            style={[styles.emojiBtn, nivel === item.val && styles.emojiSelected]}
            onPress={() => { setNivel(item.val); setSentimento(item.label); }}
          >
            <Ionicons name={item.icon} size={30} color={nivel === item.val ? '#FFF' : colors.primary} />
            <Text style={[styles.emojiLabel, nivel === item.val && {color:'#FFF'}]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Input do CRUD */}
      <View style={styles.inputBox}>
        <TextInput 
          style={styles.input} 
          value={comentario} 
          onChangeText={setComentario}
          placeholder="Pequena nota (Ex: Reunião estressante...)" 
        />
        <TouchableOpacity style={styles.saveBtn} onPress={salvarHumor}>
          <Ionicons name="save" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.historyTitle}>Histórico Recente</Text>

      <FlatList
        data={registros}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={[styles.indicator, { backgroundColor: item.nivel < 3 ? colors.error : colors.primary }]} />
            <View style={{flex:1, paddingLeft: 10}}>
              <Text style={styles.cardStatus}>{item.sentimento} ({item.nivel}/5)</Text>
              <Text style={styles.cardText}>{item.comentario}</Text>
            </View>
            <TouchableOpacity onPress={() => deletar(item.id)}>
              <Ionicons name="trash-outline" size={20} color={colors.textLight} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: colors.background },
  title: { fontSize: 26, fontWeight: 'bold', color: colors.primary },
  subtitle: { fontSize: 16, color: colors.textLight, marginBottom: 20 },
  emojiContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  emojiBtn: { alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: '#FFF', width: 60 },
  emojiSelected: { backgroundColor: colors.primary },
  emojiLabel: { fontSize: 10, marginTop: 5, color: colors.primary, fontWeight: 'bold' },
  inputBox: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, backgroundColor: '#FFF', borderRadius: 10, padding: 15, marginRight: 10, borderWidth:1, borderColor:'#EEE' },
  saveBtn: { backgroundColor: colors.secondary, justifyContent: 'center', padding: 15, borderRadius: 10 },
  historyTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 10 },
  card: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 10, padding: 15, marginBottom: 10, alignItems: 'center', elevation: 2 },
  indicator: { width: 5, height: '100%', borderRadius: 5 },
  cardStatus: { fontWeight: 'bold', color: colors.text },
  cardText: { color: colors.textLight, fontSize: 14 }
});