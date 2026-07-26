import { useState } from 'react';

export function useActivityHistory() {
  // Aquí podrías tener un useEffect que llame a tu backend para traer el historial real
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: 'Inicio de sesión en Windows',
      details: 'Buenos Aires, Argentina • Chrome',
      time: 'Hoy, 14:30'
    },
    {
      id: 2,
      title: 'Cambio de configuración de privacidad',
      details: 'Se actualizó la visibilidad del perfil.',
      time: 'Ayer, 09:15'
    }
  ]);

  const clearHistory = () => {
    setActivities([]);
  };

  return { 
    activities,
    clearHistory
  };
}