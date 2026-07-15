import { useState } from "react";
import Logo from "../../../components/Logo/Logo";
import './Login.css'

function Login(){
    const [error, setError] = useState('');
    return (
        <div className="login-container">
            <div className="login-card">
                <Logo size="24px" />
                <h1 className="login-title">Iniciar sesión</h1>
                <form className="login-form">
                    <div className="login-input-container">
                        <input 
                            type="text"
                            required
                            className="login-input"
                            placeholder="Correo electronico o telefono" 
                        />
                    </div>

                    {error && <p className="login-error">{error}</p>}

                    <a href="#" className="login-forgot">¿Has olvidado tu correo electronico?</a>

                    <div className="login-btns-container">
                        <button 
                            type="button" 
                            className="login-btn-create"
                        >
                            Crear cuenta
                        </button>
                        <button type="submit" className="login-btn-submit">Siguiente</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;