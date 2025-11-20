const lightColors = {
  primary: '#006D77',
  secondary: '#E29578',
  background: '#F0F4F8',
  surface: '#FFFFFF',
  text: '#22333B',
  textLight: '#8395A7',
  error: '#D32F2F'
};

// Cores escuras
const darkColors = {
  primary: '#83C5BE',
  secondary: '#FFDDD2',
  background: '#121212',
  surface: '#1E1E1E',
  text: '#EDF2F4',
  textLight: '#A0A0A0',
  error: '#FF6B6B'
};

// Função de segurança
export const getTheme = (mode) => {
  if (mode === 'dark') {
    return darkColors;
  }
  // Retorno padrão garantido
  return lightColors;
};

export const commitHash = "fix-final-v3";