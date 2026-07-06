interface BookmarkProps {
  title: string;
  url?: string;
  domain?: string;
  isFolder?: boolean;
  links?: BookmarkProps[]; 
}


const FolderIcon = () => (
  <svg className="bookmark-icon folder-svg" focusable="false" viewBox="0 0 24 24">
    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
  </svg>
);

export default function Bookmark({title, url, domain, isFolder, links} : BookmarkProps){
    return (
        <>
        <button>
            
        </button>
        {isFolder ? (
            <FolderIcon />
        ) : (
            <img
                src={`https://www.google.com/s2/favicons?domain=${domain}&sz=16`}
                alt=""
                className="bookmark-icon"
            />
        )}
        <span className="bookmark-title">{title}</span>
        </>
    );
}