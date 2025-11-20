import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Alert, 
  StyleSheet, 
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import { useTheme } from '../../contexts/ThemeContext'; // Importando o contexto do Tema

export default function PrioridadesScreen() {
  const { theme } = useTheme(); // Usando as cores dinâmicas (Dark/Light)
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
      Alert.alert('Erro de Conexão', 'Não foi possível carregar. Verifique se o backend está rodando e o IP está correto.'); 
    } finally { 
      setLoading(false); // Garante que o loading suma
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const addItem = async () => {
    if (!text.trim()) return;
    try {
      await api.post('/prioridades', { descricao: text, categoria: 'Geral' });
      setText('');
      fetchItems();
    } catch (e) { 
      Alert.alert('Erro', 'Falha ao salvar. Verifique a API.'); 
    }
  };

  const deleteItem = async (id) => {
    try {
      await api.delete(`/prioridades/${id}`);
      fetchItems();
    } catch (e) { 
      Alert.alert('Erro', 'Falha ao deletar o item.'); 
    }
  };

  return (
    // Aplicando cor de fundo dinâmica
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      <Text style={[styles.header, { color: theme.primary }]}>Ritual de Check-out</Text>
      <Text style={[styles.subHeader, { color: theme.textLight }]}>Defina suas 3 prioridades para amanhã.</Text>
      
      <View style={styles.inputBox}>
        <TextInput 
          style={[
            styles.input, 
            { 
              backgroundColor: theme.surface, 
              color: theme.text, 
              borderColor: theme.textLight 
            }
          ]} 
          value={text} 
          onChangeText={setText} 
          placeholder="Ex: Revisar relatório final..."
          placeholderTextColor={theme.textLight}
        />
        
        <TouchableOpacity 
          style={[styles.addBtn, { backgroundColor: theme.primary }]} 
          onPress={addItem}
        >
          <Ionicons name="arrow-up" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={theme.primary} style={{marginTop: 20}} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={i => i.id.toString()}
          contentContainerStyle={{paddingBottom: 20}}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <View style={{flex: 1}}>
                <Text style={[styles.cardText, { color: theme.text }]}>{item.descricao}</Text>
                <Text style={[styles.cardCategory, { color: theme.primary }]}>
                  {item.categoria || 'Geral'}
                </Text>
              </View>
              
              <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.deleteBtn}>
                <Ionicons name="trash-outline" size={22} color={theme.secondary} />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', color: theme.textLight, marginTop: 20}}>
              Nenhuma prioridade definida.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  header: { fontSize: 26, fontWeight: 'bold' },
  subHeader: { fontSize: 14, marginBottom: 20 },
  inputBox: { flexDirection: 'row', marginBottom: 20 },
  input: { 
    flex: 1, 
    padding: 15, 
    borderRadius: 12, 
    marginRight: 10, 
    fontSize: 16, 
    borderWidth: 1 
  },
  addBtn: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    borderRadius: 12 
  },
  card: { 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 10, 
    flexDirection: 'row', 
    alignItems: 'center', 
    elevation: 1 
  },
  cardText: { fontSize: 16, fontWeight: '500' },
  cardCategory: { fontSize: 12, marginTop: 4 },
  deleteBtn: { padding: 10 }
});