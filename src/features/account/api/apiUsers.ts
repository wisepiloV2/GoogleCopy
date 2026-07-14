export interface User {
  id: string;
  name: string;
  email: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'Wisepilo', email: 'wisepilo@gmail.com'},
  { id: '2', name: 'Juan Perez', email: 'juan@gmail.com' }
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

function createUser(userData: Omit<User, 'id'>): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        id: crypto.randomUUID(), 
        ...userData
      };
      mockUsers.push(newUser);
      resolve(newUser);
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
  createUser
}