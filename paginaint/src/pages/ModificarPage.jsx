// import React, { useState } from 'react';
// import NavigationBar from './NavigationBar';
// import { useAuth } from '../context/Auth.Context';
// import { updateUserRequest } from '../api/auth';
// import Swal from 'sweetalert2'; // Importar SweetAlert

// function ModificarPage() {
//     const { user, updateUser } = useAuth();

//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: ''
//     });
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const [showModal, setShowModal] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             if (!formData.username || !formData.email || !formData.password) {
//                 throw new Error('Por favor complete todos los campos.');
//             }

//             if (!user || !user.id) {
//                 throw new Error('Usuario no encontrado o ID no válido');
//             }

//             // Mostrar SweetAlert para confirmar la modificación del usuario
//             const result = await Swal.fire({
//                 title: '¿Modificar usuario?',
//                 text: '¿Estás seguro de que deseas modificar el usuario?',
//                 icon: 'question',
//                 showCancelButton: true,
//                 confirmButtonColor: '#3085d6',
//                 cancelButtonColor: '#d33',
//                 confirmButtonText: 'Sí, modificar',
//                 cancelButtonText: 'Cancelar'
//             });

//             if (result.isConfirmed) {
//                 // Si el usuario confirma, enviar la solicitud de actualización
//                 const res = await updateUserRequest(user.id, formData);
//                 if (res && res.data && res.data.message) {
//                     setMessage('La solicitud de actualización no fue exitosa.');
//                     updateUser({ ...user, ...formData });
//                     setShowModal(true);
//                 } else {
//                     throw new Error('Los datos se actualizaron correctamente');
//                 }
//             } else {
//                 // Si el usuario cancela, no hacer nada
//                 console.log('La modificación del usuario fue cancelada.');
//             }
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message); // Mostrar el mensaje de error del backend
//             } else {
//                 setError(error.message); // Mostrar mensaje de error genérico o personalizado
//             }
//         }
//     };

//     return (
//         <div className="m-0">
//             <NavigationBar />
//             <div className="flex flex-col items-center">
//                 <h2 className="text-4xl text-black mb-4">Actualizar Perfil de Usuario</h2>
//                 <form onSubmit={handleSubmit} className="w-5/12 border rounded py-10 px-10 text-gray-700 shadow" style={{ borderColor: 'blue' }}>
//                     <div className="mt-4">
//                         <label htmlFor="username" className="block mb-2">Usuario:</label>
//                         <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
//                     </div>
//                     <div className="mt-4">
//                         <label htmlFor="email" className="block mb-2">Correo Electrónico:</label>
//                         <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
//                     </div>
//                     <div className="mt-4">
//                         <label htmlFor="password" className="block mb-2">Contraseña:</label>
//                         <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
//                     </div>
//                     <button type="submit" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">Actualizar</button>
//                 </form>
//                 {error && <p className="text-red-500 mt-4">{error}</p>}
//             </div>
//             {showModal && (
//                 <div className="fixed z-10 inset-0 overflow-y-auto">
//                     <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//                         <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//                             <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//                         </div>
//                         <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//                         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//                             <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                                 <div className="sm:flex sm:items-start">
//                                     <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
//                                         <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                                         </svg>
//                                     </div>
//                                     <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                                         <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
//                                             ¡Éxito!
//                                         </h3>
//                                         <div className="mt-2">
//                                             <p className="text-sm text-gray-500">
//                                                 {message}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ModificarPage;
