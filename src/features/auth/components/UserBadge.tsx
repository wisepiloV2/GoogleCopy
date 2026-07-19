interface UserBadgeProps {
  emailOrName: string;
}

export function UserBadge({ emailOrName }: UserBadgeProps) {
  if (!emailOrName.trim()) return null;
  
  return (
    <div className="user-badge" style={{ marginBottom: '16px' }}>
      <span>{emailOrName}</span>
    </div>
  );
}