import styles from './SearchResult.module.css';

interface SearchResultProps {
  title: string;
  url: string;
  snippet: string;
}

function getDisplayUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    return `${parsedUrl.hostname}${parsedUrl.pathname === '/' ? '' : parsedUrl.pathname}`;
  } catch {
    return url;
  }
}

const WebIcon = () => (
  <span className={styles.webIcon}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  </span>
);

export function SearchResult({title, url, snippet}: SearchResultProps) {
  const displayUrl = getDisplayUrl(url);

  return (
    <article className={styles.result}>

      <a
        href={url}
        className={styles.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WebIcon />
        <div className={styles.infoContaint}>
          <span className={styles.titleDomain}>{title}</span>
          <span className={styles.domain}>
            {displayUrl}
          </span> 
        </div>
      </a>

      <h2 className={styles.title}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
      </h2>

      <p className={styles.snippet}>
        {snippet}
      </p>

    </article>
  );
}