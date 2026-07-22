import { ForgotPassword } from "../features/authV2";

export function ForgotPasswordPage(){
    return (
        <main style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', minWidth: '100vw'}}>
            <ForgotPassword />
        </main>
    );
}