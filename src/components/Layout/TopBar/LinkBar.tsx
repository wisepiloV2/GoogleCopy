import styles from './LinkBar.module.css';

export default function LinkBar() {
  return (
    <div className={styles.linkBarContainer}>
      <a href="https://mail.google.com" className={styles.linkBarLink}>
        Gmail
      </a>
      <a href="https://images.google.com" className={styles.linkBarLink}>
        Imágenes
      </a>
    </div>
  );
}