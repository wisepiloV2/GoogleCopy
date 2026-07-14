import { HomePage } from "./pages/HomePage"
import {AuthProvider} from "./context/AuthProvider"

export default function App() {
    return (
        <AuthProvider>
            <HomePage />
        </AuthProvider>
    );
}