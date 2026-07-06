interface UserAvatarProps {
  onClick?: () => void;
  size?: 'small' | 'large'; 
}

export default function UserAvatar({ onClick, size = 'small' }: UserAvatarProps) {
  const sizeStyles = size === 'large' ? {
    width: '86px',
    height: '86px',
    fontSize: '2.5rem',
  } : {
    width: '32px', 
    height: '32px',
    fontSize: '0.9rem',
  };

  return (
    <button 
      className='user-avatar' 
      onClick={onClick}
      style={{
        backgroundColor: '#e53935', 
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'box-shadow 0.2s',
        lineHeight: '0',
        ...sizeStyles
      }}
    >
      W
    </button>
  );
}