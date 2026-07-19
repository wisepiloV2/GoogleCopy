import { type ReactNode } from 'react';

interface FormLayoutProps {
  titleText: string | ReactNode;
  subtitleText?: string | ReactNode;
  formComponent: ReactNode;      
  actionsComponent?: ReactNode;     
}

function FormLayout({ titleText, subtitleText, formComponent, actionsComponent }: FormLayoutProps){}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  idText: string;
}

function InputField({ labelText, idText, className = '', ...propsToInput }: InputFieldProps){}

interface UserBadgeProps {
  emailOrName: string;
}

function UserBadge({ emailOrName }: UserBadgeProps){}