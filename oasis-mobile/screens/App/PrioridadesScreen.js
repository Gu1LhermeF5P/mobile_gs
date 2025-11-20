import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import { colors } from '../../config/theme';

export default function PrioridadesScreen() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get('/prioridades');
      setItems(res.data);
    } catch (e) { Alert.alert('Erro', 'Falha ao carregar suas prioridades.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const addItem = async () => {
    if (!text.trim()) return;
    try {
      await api.post('/prioridades', { descricao: text, categoria: 'Geral' });
      setText('');
      fetchItems();
    } catch (e) { Alert.alert('Erro', 'Falha ao salvar. Verifique a API.'); }
  };

  const deleteItem = async (id) => {
    try {
      await api.delete(`/prioridades/${id}`);
      fetchItems();
    } catch (e) { Alert.alert('Erro', 'Falha ao deletar o item.'); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ritual de Check-out</Text>
      <Text style={styles.subHeader}>Defina suas 3 prioridades para amanhã.</Text>
      
      <View style={styles.inputBox}>
        <TextInput 
          style={styles.input} 
          value={text} 
          onChangeText={setText} 
          placeholder="Ex: Revisar relatório final..."
          placeholderTextColor={colors.accentGrey}
        />
        {/* Botão usando a cor Primária */}
        <TouchableOpacity style={styles.addBtn} onPress={addItem}>
          <Ionicons name="arrow-up" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {loading ? <ActivityIndicator size="large" color={colors.primary} style={{marginTop: 20}} /> : (
        <FlatList
          data={items}
          keyExtractor={i => i.id.toString()}
          contentContainerStyle={{paddingBottom: 20}}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{flex: 1}}>
                <Text style={styles.cardText}>{item.descricao}</Text>
                <Text style={styles.cardCategory}>{item.categoria || 'Geral'}</Text>
              </View>
              {/* Ícone de lixeira usando a cor Secundária (Pêssego) para destaque de ação destrutiva */}
              <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.deleteBtn}>
                <Ionicons name="trash-outline" size={22} color={colors.secondary} />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background, paddingTop: 50 },
  header: { fontSize: 26, fontWeight: 'bold', color: colors.primary },
  subHeader: { fontSize: 14, color: colors.accentGrey, marginBottom: 20 },
  inputBox: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, backgroundColor: colors.white, padding: 15, borderRadius: 12, marginRight: 10, fontSize: 16, borderWidth: 1, borderColor: '#E0E0E0' },
  addBtn: { backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, borderRadius: 12 },
  card: { backgroundColor: colors.white, padding: 15, borderRadius: 12, marginBottom: 10, flexDirection: 'row', alignItems: 'center', elevation: 1 },
  cardText: { fontSize: 16, color: colors.textDark, fontWeight: '500' },
  cardCategory: { fontSize: 12, color: colors.primary, marginTop: 4 },
  deleteBtn: { padding: 10, backgroundColor: '#FFF5F5', borderRadius: 8 }
});