
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Adiciona Eruda para debugging mobile em desenvolvimento
if (import.meta.env.DEV) {
  import('eruda').then(eruda => eruda.default.init());
}

createRoot(document.getElementById("root")!).render(<App />);
