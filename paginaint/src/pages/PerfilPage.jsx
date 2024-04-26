import React, { useState } from 'react';
import { useAuth } from '../context/Auth.Context';
import { updateUserRequest, deleteUserRequest } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import FooterPage from '../components/FooterPage';

function PerfilPage() {
    const { isAuth, user, updateUser, logout } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        password: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleCloseProfile = () => {
        navigate('/inicio');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!formData.username || !formData.email || !formData.password) {
                throw new Error('Por favor complete todos los campos.');
            }

            if (!user || !user.id) {
                throw new Error('Usuario no encontrado o ID no válido');
            }

            const result = await Swal.fire({
                title: '¿Modificar usuario?',
                text: '¿Estás seguro de que deseas modificar el usuario?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, modificar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                const res = await updateUserRequest(user.id, formData);
                if (res && res.data && res.data.message) {
                    setMessage('La solicitud de actualización no fue exitosa.');
                    updateUser({ ...user, ...formData });
                    setShowModal(true);
                } else {
                    throw new Error('Los datos se actualizaron correctamente');
                }
            } else {
                console.log('La modificación del usuario fue cancelada.');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError(error.message);
            }
        }
    };

    const handleDelete = async () => {
        try {
            const result = await Swal.fire({
                title: '¿Eliminar usuario?',
                text: '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar cuenta',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                await deleteUserRequest(user.id);
                setShowModal(true);
                logout(); 
                navigate('/'); 
            }
        } catch (error) {
            setError('Error al intentar eliminar la cuenta.');
        }
    };

    return (
        <div className="m-0">
            <NavigationBar />
            <div className="flex justify-center items-center">
                <h2 style={styles.profileTitle}>
                    <FontAwesomeIcon icon={faUser} className="text-black text-3xl mr-4" style={styles. userIcon} />
                    Perfil De Usuario
                </h2>
            </div>
            <hr className="my-2 text-black" />
            <div className="flex justify-center mt-0">
                <form onSubmit={handleSubmit} style={styles.formContainer}>
                    <div className="mb-4">
                        <div className="mb-2">
                            <label style={styles.formLabel} htmlFor="nombre">Username:</label>
                            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} style={styles.formInput} />
                        </div>

                        <div className="mb-2">
                            <label style={styles.formLabel} htmlFor="email">Correo Electrónico:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} style={styles.formInput} />
                        </div>

                        <div className="mb-2">
                            <label style={styles.formLabel} htmlFor="password">Nueva Contraseña:</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} style={styles.formInput} />
                        </div>

                        <div className="flex justify-center mt-4">
                            <button onClick={handleCloseProfile} style={styles.formButton}>Cerrar</button>
                            <button type="submit" style={styles.formButton}>Actualizar</button>
                            <button onClick={handleDelete} style={{ ...styles.formButton, ...styles.deleteButton }}>Eliminar</button>
                        </div>
                    </div>
                </form>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            ¡Éxito!
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <FooterPage />
        </div>
    );
}


const styles = {
    profileTitle: {
        marginTop: '0rem',
        marginBottom: '0rem', 
        textAlign: 'center',
        fontSize: '3rem',
        color: 'black',
    },
    formContainer: {
        border: '1px solid blue',
        borderRadius: '0.5rem',
        padding: '1.5rem', // Reducir el padding para reducir el tamaño del formulario
        width: '50%', // Reducir el ancho del formulario
        marginBottom: '5rem', // Reducir el margen inferior
        marginTop: '1rem', // Mantener el margen superior
    },
    formLabel: {
        fontSize: '1.2rem',
        color: '#2b6cb0',
        fontWeight: 'bold',
    },
    formInput: {
        width: '100%',
        padding: '0.5rem',
        borderRadius: '0.25rem',
        border: '1px solid #2b6cb0',
        marginTop: '0.5rem',
        marginBottom: '1rem',
    },
    formButton: {
        backgroundColor: '#2b6cb0',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        border: 'none',
        cursor: 'pointer',
        marginRight: '1rem',
    },
    deleteButton: {
        backgroundColor: 'red', 
    },
    iconContainer: {
        width: '80px', 
        height: '80px',
    },
    userIcon: {
        fontSize: '3rem', 
    },
};

export default PerfilPage;
