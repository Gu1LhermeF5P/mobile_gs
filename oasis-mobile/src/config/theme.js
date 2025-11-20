// Definição das paletas
const lightColors = {
  primary: '#006D77',
  secondary: '#E29578',
  background: '#F0F4F8',
  surface: '#FFFFFF',
  text: '#22333B',
  textLight: '#8395A7',
  error: '#D32F2F'
};

const darkColors = {
  primary: '#83C5BE', 
  background: '#121212', 
  surface: '#1E1E1E',    
  text: '#EDF2F4',
  textLight: '#A0A0A0',
  error: '#FF6B6B'
};

export const getTheme = (mode) => mode === 'dark' ? darkColors : lightColors;
export const commitHash = "final-v2-release";