import Bookmark from "./Bookmark";
import "./BookmarksBar.css"

export default function BookmarksBar() {
  const bookmarksData = [
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

  return (
    <div className="bookmarks-bar-container">
      <div className="bookmarks-list">
        {bookmarksData.map((bm, i) => (
          <Bookmark key={i} {...bm} />
        ))}
      </div>
    </div>
  );
}