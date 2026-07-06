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

export default function BookmarksBar(){
    return(
        <div className='bookmarks-bar-container'>
            <div className="bookmarks-list">
                {MOCK_BOOKMARKS.map((bookmark) => (
                    <a
                        key={bookmark.id}
                        href={bookmark.url || '#'}
                        className="bookmark-item"
                        title={bookmark.title}
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
                    </a>
                ))}
            </div>


            <div className="bookmarks-right-actions">
                <div className="bookmark-item">
                <FolderIcon />
                <span className="bookmark-title">Otros marcadores</span>
                </div>
            </div>
        </div>
    );
}