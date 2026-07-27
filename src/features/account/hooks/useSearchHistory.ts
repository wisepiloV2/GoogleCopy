import { useState } from 'react';

export function useSearchHistory() {
  const [history, setHistory] = useState([
    {
      id: 1,
      search: 'Zapatillas de running',
      date: '15 de julio de 2026',
      time: '10:15'
    },
    {
      id: 2,
      search: 'Cómo hacer masa madre',
      date: '16 de julio de 2026',
      time: '18:42'
    },
    {
      id: 3,
      search: 'Mejores auriculares inalámbricos',
      date: '18 de julio de 2026',
      time: '09:30'
    },
    {
      id: 4,
      search: 'React hooks tutorial',
      date: '20 de julio de 2026',
      time: '14:20'
    },
    {
      id: 5,
      search: 'Clima en Buenos Aires',
      date: '21 de julio de 2026',
      time: '08:00'
    },
    {
      id: 6,
      search: 'Receta de tarta de manzana',
      date: '22 de julio de 2026',
      time: '16:45'
    },
    {
      id: 7,
      search: 'Monitor 4K barato',
      date: '24 de julio de 2026',
      time: '21:10'
    },
    {
      id: 8,
      search: 'Horarios tren Roca',
      date: '25 de julio de 2026',
      time: '07:30'
    },
    {
      id: 9,
      search: 'Restaurantes cerca de mí',
      date: '26 de julio de 2026',
      time: '20:15'
    },
    {
      id: 10,
      search: 'Qué significa el código HTTP 404',
      date: '27 de julio de 2026',
      time: '11:05'
    }
  ]);

  const clearHistory = () => {
    setHistory([]);
  };

  return { 
    history,
    clearHistory
  };
}