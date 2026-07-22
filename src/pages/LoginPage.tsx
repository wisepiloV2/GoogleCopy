import { LoginForm } from "../features/authV2";

export function LoginPage(){
    return (
        <main style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', minWidth: '100vw'}}>
            <LoginForm />
        </main>
    );
}