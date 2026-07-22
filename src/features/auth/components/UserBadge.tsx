import styles from './Form.module.css'

interface UserBadgeProps {
  emailOrName: string;
}

export function UserBadge({ emailOrName }: UserBadgeProps) {
  if (!emailOrName.trim()) return null;
  
  return (
    <div className={styles.userBadge}>
      <span>{emailOrName}</span>
    </div>
  );
}