import './AppLink.css'

interface AppLinkProps {
    name: string;
    url: string;
}

export default function AppLink({name, url} : AppLinkProps){
    return (
        <a href={url} className="app-item" target="_blank" rel="noopener noreferrer">
              <img
                src={`https://www.google.com/s2/favicons?domain=${url}&sz=64`}
                alt={`Icono de ${name}`}
                className="app-icon"
              />
              <span className="app-name">{name}</span>
        </a>
    )
}