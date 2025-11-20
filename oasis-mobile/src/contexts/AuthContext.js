import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email, password) => {
    if (!email || !password) {
      Alert.alert("Atenção", "Informe e-mail e senha.");
      return;
    }

    setLoading(true);

    try {
      // LOGIN REAL NO JAVA
      // Se a baseURL do api.js terminar em /api, use '/auth/login'
      const response = await api.post('/auth/login', {
        email: email,
        senha: password
      });

      // Se chegou aqui, é 200 OK. O usuário existe.
      // Salvamos o usuário no estado para liberar o App.
      setUser(response.data);

    } catch (error) {
      console.log(error);
      if (error.response) {
        // Erro que veio do Java (401 ou 404)
        Alert.alert("Falha no Login", "E-mail ou senha incorretos.");
      } else {
        // Erro de conexão (Java desligado ou IP errado)
        Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor.");
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