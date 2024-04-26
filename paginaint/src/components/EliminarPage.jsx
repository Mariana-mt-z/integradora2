import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { useAuth } from '../context/Auth.Context';
import { deleteUserRequest } from '../api/auth';

function EliminarPage() {
    const { user } = useAuth();

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleDelete = async () => {
        try {
            if (!user || !user.id) {
                setError('Usuario no encontrado o ID no válido');
                return;
            }

            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: '¿Quieres eliminar tu cuenta? Esta acción no se puede deshacer.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar cuenta',
                cancelButtonText: 'No, cancelar'
            });

            if (result.isConfirmed) {
                const res = await deleteUserRequest(user.id);
                if (res && res.status === 204) {
                    window.location.href = '/';
                } else {
                    setError('La solicitud de eliminación no fue exitosa.');
                }
            }
        } catch (error) {
            setError('Ocurrió un error al procesar la solicitud.');
            console.error(error);
        }
    };

    return (
        <div>
            <div className="mb-4">
                <button type="button" onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded mb-2">Eliminar Cuenta</button>
                {error && <p>{error}</p>}
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default EliminarPage;
