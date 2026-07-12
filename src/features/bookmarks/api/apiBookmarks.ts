// mockApi.ts
export interface BookmarkItem {
  id: string;
  title: string;
  url?: string;
  domain?: string;
  isFolder?: boolean;
  links?: BookmarkItem[];
}

// Datos iniciales con IDs generados
const initialData: BookmarkItem[] = [
  { id: "1", title: "GitHub", domain: "github.com", url: "https://github.com" },
  {
    id: "2",
    title: "Desarrollo",
    isFolder: true,
    links: [
      { id: "3", title: "React", domain: "react.dev", url: "https://react.dev" },
      { id: "4", title: "TypeScript", domain: "typescriptlang.org", url: "https://typescriptlang.org" },
      { 
        id: "5", 
        title: "Subcarpeta", 
        isFolder: true, 
        links: [
           { id: "6", title: "CSS Tricks", domain: "css-tricks.com", url: "https://css-tricks.com" }
        ]
      }
    ]
  }
];

// Simulamos una base de datos en memoria (podrías usar localStorage si quieres persistencia)
let fakeDatabase = [...initialData];

// Helper para simular latencia de red (500ms)
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const BookmarkAPI = {
  // READ: Obtener todos los marcadores
  getAll: async (): Promise<BookmarkItem[]> => {
    await delay();
    return [...fakeDatabase];
  },

  // CREATE: Agregar un marcador (en la raíz)
  create: async (newItem: Omit<BookmarkItem, "id">): Promise<BookmarkItem> => {
    await delay();
    const item = { ...newItem, id: crypto.randomUUID() };
    fakeDatabase = [...fakeDatabase, item];
    return item;
  },

  // DELETE: Eliminar un marcador buscando de forma recursiva por ID
  delete: async (id: string): Promise<void> => {
    await delay();
    
    const removeRecursively = (items: BookmarkItem[]): BookmarkItem[] => {
      return items
        .filter(item => item.id !== id)
        .map(item => {
          if (item.isFolder && item.links) {
            return { ...item, links: removeRecursively(item.links) };
          }
          return item;
        });
    };

    fakeDatabase = removeRecursively(fakeDatabase);
  }
};