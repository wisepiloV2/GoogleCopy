import { useAuth } from "@/context/AuthContext";
import { apiUser } from "@/api/apiUser";

export function useUserInfo() {
  const { user, update, checkPassword } = useAuth();

  const updateEmail = async (newEmail: string) => {
    await update({ email: newEmail }); 
  };

  const updateUsername = async (newUsername: string) => {
    await update({ username: newUsername });
  };
  
  const updatePhone = async (newPhone: string) => {
    await update({ phone: newPhone });
  };

  const updatePassword = async (newPassword: string) => {
    await apiUser.updatePassword(newPassword);
  };

  return { 
    user,
    updateEmail,
    updateUsername,
    updatePhone,
    updatePassword,
    checkPassword,
  };
}