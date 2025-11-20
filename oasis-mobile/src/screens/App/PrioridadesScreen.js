import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import { colors } from '../../config/theme'; // <--- Import direto, sem Contexto

export default function PrioridadesScreen() {
  // Removemos: const { theme } = useTheme();
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get('/prioridades');
      setItems(res.data);
    } catch (e) { 
      console.log(e);
      Alert.alert('Erro', 'Não foi possível carregar. Verifique o IP no api.js'); 
    } finally { 
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const addItem = async () => {
    if (!text.trim()) return;
    try {
      await api.post('/prioridades', { descricao: text, categoria: 'Geral' });
      setText('');
      fetchItems();
    } catch (e) { Alert.alert('Erro', 'Falha ao salvar.'); }
  };

  const deleteItem = async (id) => {
    try {
      await api.delete(`/prioridades/${id}`);
      fetchItems();
    } catch (e) { Alert.alert('Erro', 'Falha ao deletar.'); }
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
          placeholderTextColor={colors.textLight}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addItem}>
          <Ionicons name="arrow-up" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{marginTop: 20}} />
      ) : (
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
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: colors.background },
  header: { fontSize: 26, fontWeight: 'bold', color: colors.primary },
  subHeader: { fontSize: 14, marginBottom: 20, color: colors.textLight },
  inputBox: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, padding: 15, borderRadius: 12, marginRight: 10, fontSize: 16, borderWidth: 1, borderColor: '#E0E0E0', backgroundColor: colors.surface, color: colors.text },
  addBtn: { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, borderRadius: 12, backgroundColor: colors.primary },
  card: { padding: 15, borderRadius: 12, marginBottom: 10, flexDirection: 'row', alignItems: 'center', elevation: 1, backgroundColor: colors.surface },
  cardText: { fontSize: 16, fontWeight: '500', color: colors.text },
  cardCategory: { fontSize: 12, marginTop: 4, color: colors.primary },
  deleteBtn: { padding: 10 }
});