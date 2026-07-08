import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
        
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;