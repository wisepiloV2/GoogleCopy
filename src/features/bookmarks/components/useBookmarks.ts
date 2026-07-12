import { useState, useEffect } from "react";
import { type BookmarkProps } from "./Bookmark"; // Asegúrate de exportar la interfaz

const LOCAL_STORAGE_KEY = "myBookmarks";

const defaultBookmarks: BookmarkProps[] = [
  { title: "GitHub", domain: "github.com", url: "https://github.com" },
  {
    title: "Desarrollo",
    isFolder: true,
    links: [
      { title: "React", domain: "react.dev", url: "https://react.dev" },
      { title: "TypeScript", domain: "typescriptlang.org", url: "https://typescriptlang.org" },
      { 
        title: "Subcarpeta", 
        isFolder: true, 
        links: [
           { title: "CSS Tricks", domain: "css-tricks.com", url: "https://css-tricks.com" }
        ]
      }
    ]
  }
];

export function useBookmarks() {
  // 1. Inicializamos el estado leyendo el localStorage
  const [bookmarks, setBookmarks] = useState<BookmarkProps[]>(() => {
    try {
      const savedBookmarks = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedBookmarks) {
        return JSON.parse(savedBookmarks);
      }
    } catch (error) {
      console.error("Error leyendo del localStorage", error);
    }
    return defaultBookmarks;
  });

  // 2. Sincronizamos con localStorage cada vez que el estado cambia
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  // 3. Función auxiliar para agregar un nuevo bookmark en la raíz
  const addBookmark = (title: string, url: string) => {
    try {
      const domain = new URL(url).hostname; // Extrae el dominio para el favicon
      const newBookmark: BookmarkProps = { title, url, domain };
      
      setBookmarks((prev) => [...prev, newBookmark]);
    } catch (error) {
      alert("Por favor, ingresa una URL válida que comience con http:// o https://");
    }
  };

  return {
    bookmarks,
    setBookmarks,
    addBookmark
  };
}