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
        // Configuração das cores da barra de abas
        tabBarActiveTintColor: colors.primary, // Cor do ícone ativo (Azul-petróleo)
        tabBarInactiveTintColor: colors.accentGrey, // Cor do ícone inativo (Cinza)
        
        // CORREÇÃO AQUI: Altura ajustada para 80 e Padding 20 para evitar botões do Android
        tabBarStyle: { 
          backgroundColor: colors.white, 
          borderTopColor: '#E0E0E0', 
          height: 80, 
          paddingBottom: 20, 
          paddingTop: 10 
        },
        
        tabBarIcon: ({ color, size, focused }) => {
          const icons = {
            Dashboard: focused ? 'home' : 'home-outline',
            Ritual: focused ? 'list' : 'list-outline',
            Respirar: focused ? 'leaf' : 'leaf-outline',
            Perfil: focused ? 'person' : 'person-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Ritual" component={PrioridadesScreen} options={{title: 'Check-out'}}/>
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