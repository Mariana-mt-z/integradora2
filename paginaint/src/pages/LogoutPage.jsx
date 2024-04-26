import React from 'react';
import { useAuth } from '../context/Auth.Context';
import Swal from 'sweetalert2';

function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
       
        window.location.href = '/login';
      } else {
      
        window.location.href = '/';
      }
    });
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Logout
    </button>
  );
}

export default LogoutButton;
