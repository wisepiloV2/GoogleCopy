export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  token?: string; 
  //Pondre contraseña solo para hacer el log
  password: string;
}

const mockUsers: User[] = [
];


function getUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockUsers]);
    }, 500);
  });
}

function getUserById(id: string): Promise<User | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.id === id);
      resolve(user);
    }, 800);
  });
}

function loginUserByEmailAndPassword(email: string, password: string): Promise<string | Error> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email);
      
      if (!user || user.password !== password) {
        resolve(new Error("Email o Contraseña incorrecta"));
      } else {
        resolve(user.id);
      }
    }, 1000); 
  });
}

function createUser(userData: Omit<User, 'id'>): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newId = crypto.randomUUID();
      const newUser: User = {
        id: newId, 
        ...userData
      };
      mockUsers.push(newUser);
      resolve(newId);
    }, 800);
  });
}

function updateUser(id: string, updates: Partial<Omit<User, 'id'>>): Promise<User | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockUsers.findIndex(u => u.id === id);
      
      if (index === -1) {
        return resolve(null);
      }

      mockUsers[index] = { ...mockUsers[index], ...updates };
      resolve(mockUsers[index]);
    }, 800);
  });
}

function deleteUser(id: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockUsers.findIndex(u => u.id === id);
      
      if (index === -1) {
        return resolve(false); 
      }

      mockUsers.splice(index, 1);
      resolve(true);
    }, 800);
  });
}

export {
  getUserById,
  createUser,
  loginUserByEmailAndPassword
}