import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email, password) => {
    setLoading(true);
    // Simulação de delay da API
    setTimeout(() => {
      if (email.includes('@')) {
        // Sucesso simulado
        setUser({ email, token: 'demo-token-oasis' });
      } else {
        Alert.alert('Erro de Acesso', 'E-mail ou senha inválidos.');
      }
      setLoading(false);
    }, 1500);
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