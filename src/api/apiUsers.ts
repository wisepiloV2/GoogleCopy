export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

const mockUsers: User[] = [
  { id: '1', name: 'Wisepilo', email: 'wisepilo@gmail.com', role: 'admin' },
  { id: '2', name: 'Juan Perez', email: 'juan@gmail.com', role: 'customer' }
];

export function getUserById(id: string): Promise<User | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.id === id);
      resolve(user);
    }, 800);
  });
}