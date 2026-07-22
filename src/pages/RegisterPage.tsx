import { RegisterForm } from "../features/auth";

export function RegisterPage(){
    return (
        <main style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', minWidth: '100vw', boxSizing: 'content-box'}}>
            <RegisterForm />
        </main>
    );
}