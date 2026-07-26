import { useState } from 'react';

export function usePersonalInfo() {
  const [userData, setUserData] = useState({
    name: 'Maty2002 2002',
    email: 'maty20022@gmail.com',
    initial: 'M',
    phone: 'Añadir un teléfono'
  });

  const updateAvatar = () => {
    console.log("Lógica para subir nueva foto...");
  };

  const updatePhone = (newPhone: string) => {
    setUserData(prev => ({ ...prev, phone: newPhone }));
  };

  return { 
    userData, 
    updateAvatar,
    updatePhone
  };
}