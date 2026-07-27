import { useAuth } from '../../../context/AuthProvider';

export function usePersonalInfo() {
  const { user, update } = useAuth();

  const updateEmail = async (newEmail: string) => {
    await update({ email: newEmail }); 
  }

  const updateFirstName = async (newFirstName : string) => {
    await update({firstName: newFirstName});
  }

  const updateLastName = async (newLastName : string) => {
    await update({lastName: newLastName});
  }
  
  const updatePhone = async (newPhone : string) => {
    await update({phone: newPhone});
  }

  const updatePassword = async (newPassword : string) => {
    await update({password: newPassword});
  }

  return { 
    user,
    updateEmail,
    updateFirstName,
    updateLastName,
    updatePhone,
    updatePassword
  };
}