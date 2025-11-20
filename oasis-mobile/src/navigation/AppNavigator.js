import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../contexts/AuthContext';
import { colors } from '../config/theme';

// Import das Telas
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import DashboardScreen from '../screens/App/DashboardScreen';
import PrioridadesScreen from '../screens/App/PrioridadesScreen';
import PerfilScreen from '../screens/App/PerfilScreen';
import SobreScreen from '../screens/App/SobreScreen';
import RespiracaoScreen from '../screens/Features/RespiracaoScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        // Cor do ícone ativo (Azul-petróleo)
        tabBarActiveTintColor: colors.primary,
        // Cor do ícone inativo (Cinza suave para limpeza visual)
        tabBarInactiveTintColor: colors.textLight,
        
        // Estilização da Barra (Clean e Moderna)
        tabBarStyle: { 
          backgroundColor: colors.white, 
          borderTopColor: '#F0F0F0', // Borda bem sutil
          borderTopWidth: 1,
          height: 80, 
          paddingBottom: 20, 
          paddingTop: 10,
          elevation: 10,      // Sombra no Android
          shadowOpacity: 0.1, // Sombra no iOS
        },

        // Estilo do Texto das abas
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 0
        },
        
        // Configuração dos Ícones
        tabBarIcon: ({ color, size, focused }) => {
          const icons = {
            Dashboard: focused ? 'home' : 'home-outline',
            Diario: focused ? 'book' : 'book-outline', // Ícone de Livro para o Diário
            Respirar: focused ? 'leaf' : 'leaf-outline',
            Perfil: focused ? 'person' : 'person-outline',
          };
          // Aumenta levemente o ícone quando selecionado (28px vs 24px)
          return <Ionicons name={icons[route.name]} size={focused ? 28 : 24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      {/* Renomeado de Ritual para Diario para fazer sentido com o ícone */}
      <Tab.Screen name="Diario" component={PrioridadesScreen} options={{title: 'Diário'}}/>
      <Tab.Screen name="Respirar" component={RespiracaoScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen name="HomeTabs" component={AppTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Sobre" component={SobreScreen} options={{ title: 'Sobre o App', headerTintColor: colors.primary }} />
        </Stack.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}