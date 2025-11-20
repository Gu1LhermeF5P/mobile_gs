import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export default function RespiracaoScreen() {
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current; // Valor inicial 1x
  const [fase, setFase] = useState('Inspire...');

  useEffect(() => {
    const respirar = () => {
      Animated.sequence([
        // Inspirar (Cresce) - 4 segundos
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 4000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        // Expirar (Diminui) - 4 segundos
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        })
      ]).start(() => respirar()); // Loop infinito
    };

    respirar();

    // Intervalo para mudar o texto
    const interval = setInterval(() => {
      setFase((prev) => prev === 'Inspire...' ? 'Expire...' : 'Inspire...');
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Ritual de Calma</Text>
      
      <Animated.View 
        style={[
          styles.circle, 
          { 
            backgroundColor: theme.primary,
            transform: [{ scale: scaleAnim }] 
          }
        ]} 
      >
        <Text style={styles.text}>{fase}</Text>
      </Animated.View>
      
      <Text style={[styles.desc, { color: theme.textLight }]}>
        Siga o ritmo do círculo
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 60 },
  circle: { 
    width: 200, height: 200, borderRadius: 100, 
    justifyContent: 'center', alignItems: 'center', 
    elevation: 10, shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 10 
  },
  text: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  desc: { marginTop: 60, fontSize: 16 }
});