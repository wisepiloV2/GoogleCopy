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

// READ: Obtener todos los usuarios
function getUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Devolvemos una copia para evitar mutaciones directas fuera del CRUD
      resolve([...mockUsers]);
    }, 500);
  });
}

// READ: Obtener por ID (tu código original)
export function getUserById(id: string): Promise<User | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.id === id);
      resolve(user);
    }, 800);
  });
}

// CREATE: Crear un usuario (Omitimos el 'id' porque lo genera la "base de datos")
export function createUser(userData: Omit<User, 'id'>): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        id: crypto.randomUUID(), // Genera un ID único (nativo en Node >= 15.6)
        ...userData
      };
      mockUsers.push(newUser);
      resolve(newUser);
    }, 800);
  });
}

// UPDATE: Actualizar usuario (Partial hace que todos los campos sean opcionales)
function updateUser(id: string, updates: Partial<Omit<User, 'id'>>): Promise<User | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockUsers.findIndex(u => u.id === id);
      
      if (index === -1) {
        return resolve(null); // No se encontró
      }

      // Mezclamos los datos actuales con los nuevos
      mockUsers[index] = { ...mockUsers[index], ...updates };
      resolve(mockUsers[index]);
    }, 800);
  });
}

// DELETE: Eliminar usuario
function deleteUser(id: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockUsers.findIndex(u => u.id === id);
      
      if (index === -1) {
        return resolve(false); // No se encontró para borrar
      }

      mockUsers.splice(index, 1);
      resolve(true); // Borrado exitoso
    }, 800);
  });
}

// ==========================================
// EJECUCIÓN DE PRUEBA (Para probarlo con tsx)
// ==========================================
async function testCRUD() {
  console.log("1. Obteniendo todos los usuarios...");
  const users = await getUsers();
  console.log(users);

  console.log("\n2. Creando un nuevo usuario...");
  const newUser = await createUser({
    name: "Ana Gomez",
    email: "ana@gmail.com",
    role: "customer"
  });
  console.log("Usuario creado:", newUser);

  console.log("\n3. Actualizando el rol de Juan...");
  const updatedUser = await updateUser('2', { role: 'admin' });
  console.log("Usuario actualizado:", updatedUser);

  console.log("\n4. Eliminando al primer usuario (Wisepilo)...");
  const isDeleted = await deleteUser('1');
  console.log("¿Borrado exitoso?:", isDeleted);

  console.log("\n5. Estado final de la base de datos:");
  console.log(await getUsers());
}

// Ejecutamos la prueba
testCRUD();