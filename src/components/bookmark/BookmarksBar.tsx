import { useState } from 'react';
import './BookmarksBar.css';

interface Bookmark {
  id: string;
  title: string;
  url?: string;
  domain?: string;
  isFolder?: boolean;
}

const MOCK_BOOKMARKS: Bookmark[] = [
  { id: '1', title: 'GitHub', domain: 'github.com', url: 'https://github.com' },
  { id: '2', title: 'Work', isFolder: true },
];

const FolderIcon = () => (
  <svg className="bookmark-icon folder-svg" focusable="false" viewBox="0 0 24 24">
    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
  </svg>
);

export default function BookmarksBar() {
  // Estado para controlar qué carpeta está abierta (guarda el ID)
  const [openFolderId, setOpenFolderId] = useState<string | null>(null);

  const handleBookmarkClick = (bookmark: Bookmark) => {
    if (bookmark.isFolder) {
      // Si es carpeta, abrimos/cerramos el menú
      setOpenFolderId(prevId => prevId === bookmark.id ? null : bookmark.id);
    } else if (bookmark.url) {
      // Si es un enlace, abrimos en una nueva pestaña
      window.open(bookmark.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className='bookmarks-bar-container'>
      <div className="bookmarks-list">
        {MOCK_BOOKMARKS.map((bookmark) => (
          // Usamos un div relativo para que el menú desplegable (rectángulo) se posicione debajo del botón
          <div key={bookmark.id} style={{ position: 'relative', display: 'inline-block' }}>
            <button
              className="bookmark-item"
              title={bookmark.title}
              onClick={() => handleBookmarkClick(bookmark)}
              // Quitamos estilos por defecto del botón para que se vea como antes
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              {bookmark.isFolder ? (
                <FolderIcon />
              ) : (
                <img
                  src={`https://www.google.com/s2/favicons?domain=${bookmark.domain}&sz=16`}
                  alt=""
                  className="bookmark-icon"
                />
              )}
              <span className="bookmark-title">{bookmark.title}</span>
            </button>

            {/* Renderizado condicional del rectángulo negro (futuro componente) */}
            {bookmark.isFolder && openFolderId === bookmark.id && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '200px',
                  height: '150px',
                  backgroundColor: 'black',
                  borderRadius: '4px',
                  marginTop: '4px',
                  zIndex: 10,
                  color: 'white',
                  padding: '10px'
                }}
              >
                Menú de {bookmark.title}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bookmarks-right-actions">
        <button 
          className="bookmark-item" 
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <FolderIcon />
          <span className="bookmark-title">Otros marcadores</span>
        </button>
      </div>
    </div>
  );
}