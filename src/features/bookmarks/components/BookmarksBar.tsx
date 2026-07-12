import { useState } from "react";
import Bookmark from "./Bookmark";
import AddBookmarkModal from "./AddBookmark";
import { useBookmarks } from "./useBookmarks";
import "./BookmarksBar.css";

export default function BookmarksBar() {
  const { bookmarks, addBookmark } = useBookmarks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bookmarks-bar-container">
      <div className="bookmarks-list">
        {bookmarks.map((bm, i) => (
          <Bookmark key={i} {...bm} />
        ))}
      </div>
      
      {/* Botón que abre el modal */}
      <button className="bookmarks-btn" onClick={() => setIsModalOpen(true)}>
        Agregar
      </button>

      {/* El componente de la ventana flotante */}
      <AddBookmarkModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addBookmark} 
      />
    </div>
  );
}