import { ForgotEmail } from "../features/auth";

export function ForgotEmailPage(){
    return (
        <main style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', minWidth: '100vw'}}>
            <ForgotEmail />
        </main>
    );
}