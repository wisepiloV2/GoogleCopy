import { FormLayout } from './components/FormLayout';
import { useFormSteps } from './hooks/useFormSteps';
import { useLogin } from './hooks/useLogin'

const STEP_EMAIL = 1;
const STEP_PASSWORD = 2;

export function LoginForm(){
    const { isSubmitting, errors } = useLogin();
    const { step, handleNext, handleBack, isLastStep } = useFormSteps({maxSteps: 2});

    const getHeaderInfo = () => {
        switch(step){
            case STEP_EMAIL: return { title: "Crea una cuenta", subtitle: "Ingresa tu nombre" };
            default: return { title: "Crea una contraseña", subtitle: "Usa letras y números" };
        }
    }

    const { title, subtitle } = getHeaderInfo();
    return (
        <FormLayout
            title={title}
            subtitle={subtitle}
            actions={
                <>
                    {step == STEP_PASSWORD && (
                        <button className="btn-secondary" type="button" onClick={handleBack}>
                        Atrás
                        </button>
                    )}
                    <button  
                        className="btn-primary" 
                        type="submit"
                        form="login-form"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Cargando...' : isLastStep ? 'Ingresar' : 'Siguiente'}
                    </button>
                </>
            }
        >
            <form id='login-form'>
                {errors.root?.serverError && <p className='field-error-server'>{errors.root.serverError.message}</p>}

            </form>
        </FormLayout>
    );
}