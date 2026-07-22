export interface User {
  id?: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  token?: string; 
  //Pondre contraseña solo para hacer el log
  password: string;
}

const mockUsers: User[] = [
  {id: '1', firstName: 'wisepilo', email: 'wisepilo@gmail.com', phone: '11111111', password: 'Wisepilo1'}
];


function getUserByEmailAndPassword(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email);
      
      if (!user) {
        reject({ status: 402, message: "El usuario no existe" });
      } else if (user.password !== password) {
        reject({ status: 401, message: "Contraseña incorrecta" });
      } else {
        resolve(user);
      }
    }, 1000); 
  });
}

function createUser(userData: Omit<User, 'id'>): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const emailExists = mockUsers.some(user => user.email === userData.email);

      if (emailExists) {
        return reject({ 
          status: 409, 
          message: "Ya existe una cuenta vinculada a este correo electrónico." 
        });
      }

      const newId = crypto.randomUUID();
      const newUser: User = {
        id: newId, 
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

export {
  createUser,
  getUserByEmailAndPassword,
  updateUser
}

/*
--------------UNUSED FUNCTIONS-----------

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
*/