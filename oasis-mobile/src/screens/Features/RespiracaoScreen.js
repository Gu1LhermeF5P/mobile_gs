import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
// Mudei aqui: Importar colors direto, sem useTheme
import { colors } from '../../config/theme'; 

export default function RespiracaoScreen() {
  // Removi: const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [fase, setFase] = useState('Inspire...');

  useEffect(() => {
    const respirar = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 4000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        })
      ]).start(() => respirar());
    };

    respirar();

    const interval = setInterval(() => {
      setFase((prev) => prev === 'Inspire...' ? 'Expire...' : 'Inspire...');
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    // Mudei theme.background para colors.background
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Ritual de Calma</Text>
      
      <Animated.View 
        style={[
          styles.circle, 
          { 
            backgroundColor: colors.primary,
            transform: [{ scale: scaleAnim }] 
          }
        ]} 
      >
        <Text style={styles.text}>{fase}</Text>
      </Animated.View>
      
      <Text style={[styles.desc, { color: colors.textLight }]}>
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