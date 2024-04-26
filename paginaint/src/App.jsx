import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/Auth.Context';
import { MovimientoProvider } from './context/sensor.context';
import { GasProvider } from './context/gas.context';
import { TemperaturaProvider } from './context/temperatura.context';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TaskPage from './pages/TasksPage';
import TaskFormPage from './pages/TaskFormPage';
import ProfilePage from './pages/ProfilePage';
import InicioPage from './pages/InicioPage';
import ProtectedRoute from  './ProtectedRoute';
import TemperaturaPage from './pages/TemperaturaPage';
import PerfilPage from './pages/PerfilPage';
import MasPage from './pages/MasPage'; 
import ContactoPage from './pages/ContactoPage'; 
import MovimientoPage from './pages/MovimientoPage'; 
import GasPage from './pages/GasPage'; 



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <TemperaturaProvider>
        <MovimientoProvider>
        <GasProvider>
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/register' element={<RegisterPage />}></Route>

            <Route element={<ProtectedRoute />}>
              <Route path='/task' element={<TaskPage />}></Route>
              <Route path='/add-task' element={<TaskFormPage />}></Route>
              <Route path='/task/:id' element={<TaskFormPage />}></Route>
              <Route path='/profile' element={<ProfilePage />}></Route>
              
              <Route path='/inicio' element={<InicioPage />}></Route>
              <Route path='/perfil' element={<PerfilPage />}></Route>
              <Route path='/mas' element={<MasPage />}></Route>
              <Route path='/contacto' element={<ContactoPage />}></Route>
              <Route path='/movimiento' element={<MovimientoPage />}></Route>
              <Route path='/gas' element={<GasPage />}></Route>
              <Route path='/temperatura' element={<TemperaturaPage />}></Route>
            </Route>
          </Routes>
          </GasProvider>
        </MovimientoProvider>
        </TemperaturaProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
