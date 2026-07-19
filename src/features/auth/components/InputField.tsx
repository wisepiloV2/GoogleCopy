interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export function InputField({ label, id, className = '', ...props }: InputFieldProps) {
  return (
    <div className="input-group">
      <label className="input-label" htmlFor={id}>
        {label}
      </label>
      <input 
        id={id} 
        className={`input-box ${className}`} 
        {...props} 
      />
    </div>
  );
}