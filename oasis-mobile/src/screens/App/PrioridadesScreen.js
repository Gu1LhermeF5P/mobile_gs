import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, Keyboard 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import { colors } from '../../config/theme';

export default function PrioridadesScreen() {
  const [registros, setRegistros] = useState([]);
  const [comentario, setComentario] = useState('');
  const [nivel, setNivel] = useState(3); 
  const [sentimento, setSentimento] = useState('Normal');
  
  // Estado para controlar se estamos editando
  const [editandoId, setEditandoId] = useState(null);

  const carregarDados = async () => {
    try {
      const res = await api.get('/humor');
      setRegistros(res.data.reverse());
    } catch (e) { console.log("Erro ao carregar"); }
  };

  useEffect(() => { carregarDados(); }, []);

  // Função Inteligente: Serve para CRIAR ou ATUALIZAR
  const salvarOuAtualizar = async () => {
    if (!comentario.trim()) return Alert.alert("Ops", "Escreva uma nota sobre seu dia.");
    
    const dados = { nivel, sentimento, comentario };

    try {
      if (editandoId) {
        // MODO EDIÇÃO (UPDATE)
        await api.put(`/humor/${editandoId}`, dados);
        Alert.alert("Atualizado", "Seu registro foi corrigido!");
      } else {
        // MODO CRIAÇÃO (CREATE)
        await api.post('/humor', dados);
        Alert.alert("Registrado", "Seu humor foi salvo no histórico.");
      }

      // Limpar formulário
      limparFormulario();
      carregarDados();
      Keyboard.dismiss();

    } catch (e) { 
      Alert.alert("Erro", "Falha ao salvar os dados."); 
    }
  };

  const prepararEdicao = (item) => {
    setEditandoId(item.id);
    setComentario(item.comentario);
    setNivel(item.nivel);
    setSentimento(item.sentimento);
  };

  const limparFormulario = () => {
    setEditandoId(null);
    setComentario('');
    setNivel(3);
    setSentimento('Normal');
  };

  const deletar = async (id) => {
    Alert.alert("Excluir", "Tem certeza?", [
      { text: "Cancelar" },
      { text: "Sim", onPress: async () => {
          try { await api.delete(`/humor/${id}`); carregarDados(); } catch(e){}
        }
      }
    ]);
  };

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
      <Text style={styles.subtitle}>
        {editandoId ? "Editando registro..." : "Como você se sentiu hoje?"}
      </Text>

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
          placeholder="Pequena nota..." 
        />
        
        {/* Botão Salvar/Atualizar */}
        <TouchableOpacity 
          style={[styles.saveBtn, editandoId && { backgroundColor: colors.secondary }]} 
          onPress={salvarOuAtualizar}
        >
          <Ionicons name={editandoId ? "checkmark" : "save"} size={22} color="#FFF" />
        </TouchableOpacity>

        {/* Botão Cancelar Edição (Só aparece se estiver editando) */}
        {editandoId && (
          <TouchableOpacity style={styles.cancelBtn} onPress={limparFormulario}>
            <Ionicons name="close" size={22} color="#FFF" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.historyTitle}>Histórico Recente</Text>

      <FlatList
        data={registros}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={[styles.card, editandoId === item.id && styles.cardEditing]}>
            <View style={[styles.indicator, { backgroundColor: item.nivel < 3 ? colors.error : colors.primary }]} />
            
            <View style={{flex:1, paddingLeft: 10}}>
              <Text style={styles.cardStatus}>{item.sentimento} ({item.nivel}/5)</Text>
              <Text style={styles.cardText}>{item.comentario}</Text>
            </View>

            <View style={styles.actions}>
              {/* Botão Editar (Update) */}
              <TouchableOpacity onPress={() => prepararEdicao(item)} style={{marginRight: 15}}>
                <Ionicons name="pencil" size={20} color={colors.primary} />
              </TouchableOpacity>
              
              {/* Botão Deletar (Delete) */}
              <TouchableOpacity onPress={() => deletar(item.id)}>
                <Ionicons name="trash-outline" size={20} color={colors.textLight} />
              </TouchableOpacity>
            </View>
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
  emojiBtn: { alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: '#FFF', width: 60, elevation: 1 },
  emojiSelected: { backgroundColor: colors.primary },
  emojiLabel: { fontSize: 10, marginTop: 5, color: colors.primary, fontWeight: 'bold' },
  inputBox: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, backgroundColor: '#FFF', borderRadius: 10, padding: 15, marginRight: 10, borderWidth:1, borderColor:'#EEE' },
  saveBtn: { backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', padding: 15, borderRadius: 10, width: 50 },
  cancelBtn: { backgroundColor: colors.textLight, justifyContent: 'center', alignItems: 'center', padding: 15, borderRadius: 10, width: 50, marginLeft: 5 },
  historyTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 10 },
  card: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 10, padding: 15, marginBottom: 10, alignItems: 'center', elevation: 2 },
  cardEditing: { borderWidth: 2, borderColor: colors.secondary },
  indicator: { width: 5, height: '100%', borderRadius: 5 },
  cardStatus: { fontWeight: 'bold', color: colors.text },
  cardText: { color: colors.textLight, fontSize: 14 },
  actions: { flexDirection: 'row', alignItems: 'center' }
});