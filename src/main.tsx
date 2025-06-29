
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Adiciona Eruda para debugging mobile - sempre ativo para debug
const initEruda = async () => {
  try {
    const eruda = await import('eruda');
    eruda.default.init();
    console.log('Eruda initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Eruda:', error);
  }
};

// Inicializa Eruda sempre (para debugging mobile)
initEruda();

createRoot(document.getElementById("root")!).render(<App />);
