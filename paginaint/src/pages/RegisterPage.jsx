import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/Auth.Context';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from "../assets/astooz-png.png";

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/inicio');
    }, [isAuthenticated, navigate]);

    const onSubmit = handleSubmit(async (values) => {
        await signup(values);
        navigate('/inicio'); 
    });

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-blue-100">
            {/* Lado Izquierdo (Azul) */}
            <div className="bg-blue-800 w-1/2 h-full flex flex-col justify-center items-center">
             
                <img src={Logo} alt="Logo" className="w-30 h-30 mb-4 rounded-full bg-white p-2" />

             
                <h1 className="text-6xl font-bold text-white mb-8">BIENVENIDO</h1>
            </div>
                
            {/* Lado Derecho (Formulario de registro) */}
            <div className="w-1/2 h-full flex justify-center items-center bg-white">
                <div className="border-4 border-blue-300 w-96 h-96 rounded-3xl flex items-center justify-center">
                    <div className="border-4 border-blue-300 w-80 h-80 rounded-3xl justify-items-center">
                        {registerErrors.map((error, i) => (
                            <div className="bg-red-500 p-2 text-white text-center m-2" key={i}>
                                {error}
                            </div>
                        ))}
                        <form onSubmit={onSubmit} className="p-4 flex flex-col">
                            <h1 className="text-xl text-black-900 mb-2">Registrarse</h1>

                            <div className="mb-2">
                                <input className="border-b-2 border-solid border-blue-300 w-full py-2 px-3 focus:outline-none focus:border-blue-500" type="text" placeholder="Username" {...register('username', { required: true })} />
                                {errors.username && <p className="text-red-500">El nombre de usuario es requerido</p>}
                            </div>
                            <div className="mb-2">
                                <input className="border-b-2 border-solid border-blue-300 w-full py-2 px-3 focus:outline-none focus:border-blue-500" type="email" placeholder="Email" {...register('email', { required: true })} />
                                {errors.email && <p className="text-red-500">El correo electrónico es requerido</p>}
                            </div>
                            <div className="mb-2">
                                <input className="border-b-2 border-solid border-blue-300 w-full py-2 px-3 focus:outline-none focus:border-blue-500" type="password" placeholder="Password" {...register('password', { required: true })} />
                                {errors.password && <p className="text-red-500">La contraseña es requerida</p>}
                            </div>
                            <button
                                type="submit"
                                className="rounded-full self-center text-white p-2 w-36 bg-blue-500 hover:bg-blue-600"
                            >
                                Registrarse
                            </button>

                            <p className="text-gray-700 text-center mt-2">¿Ya tienes una cuenta? <Link to='/login' className="text-blue-500">Iniciar sesión</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
