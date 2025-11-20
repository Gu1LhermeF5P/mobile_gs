import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email, password) => {
    // Validação básica
    if (!email || !password) {
      Alert.alert("Atenção", "Informe e-mail e senha.");
      return;
    }

    setLoading(true);

    try {
      console.log("Tentando logar com:", email);

      // --- O PULO DO GATO ---
      // Criamos o objeto antes para garantir que a chave é 'senha'
      const payload = {
        email: email.trim(),   // Remove espaços extras do e-mail
        senha: password.trim() // O JAVA ESPERA 'senha', NÃO 'password'
      };

      console.log("Enviando payload:", payload); // Para você conferir no terminal

      // Chamada à API
      const response = await api.post('/auth/login', payload);

      console.log("Login autorizado! Usuário:", response.data.nome);
      
      // Salva o usuário no estado (isso libera o acesso ao Dashboard)
      setUser(response.data);

    } catch (error) {
      console.log("Erro Login:", error);
      
      if (error.response) {
        // O Backend respondeu com um erro conhecido
        const status = error.response.status;
        
        if (status === 401) {
          Alert.alert("Acesso Negado", "Senha incorreta.");
        } else if (status === 404) {
          Alert.alert("Não Encontrado", "E-mail não cadastrado.");
        } else {
          Alert.alert("Erro", "Ocorreu um erro no servidor (" + status + ").");
        }
      } else {
        // O Backend nem respondeu (Erro de rede/IP)
        Alert.alert(
          "Erro de Conexão", 
          "Não foi possível conectar. Verifique se o IP no api.js está correto e se o Java está rodando."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);