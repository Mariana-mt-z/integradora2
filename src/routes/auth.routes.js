import { Router } from "express";
import { login, register, logout, profile, verifyToken, updateUser, deleteUser } from '../controllers/auth.controller.js';
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import {mostrarTodasLasTemperaturas,
     mostrarUltimaTemperatura, 
     subirTemperatura} from '../controllers/temperatura.controller.js';
import { registrarMovimiento, obtenerUltimoMovimiento, obtenerTodosLosMovimientos, buscarMovimientosPorFecha } from '../controllers/movimiento.controller.js';
import express from 'express';
import {
     subirDeteccionFugaGas,
     mostrarTodasLasDeteccionesFugaGas,
    mostrarUltimaDeteccionFugaGas
} from '../controllers/gas.controller.js';
// import { updateUser } from '../controllers/.controller.js';


const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", authRequired, verifyToken);
router.get("/profile", authRequired, profile);
router.put('/modificar/:id',authRequired, updateUser);
router.delete("/eliminar/:id", authRequired, deleteUser);
// sensor temperatura

router.post('/temperatura', subirTemperatura);
router.get('/temperatura/ultima', mostrarUltimaTemperatura);
router.get('/temperatura', mostrarTodasLasTemperaturas);


// sensor gas
// Ruta para subir una detección de fuga de gas
router.post('/gas', subirDeteccionFugaGas);

// Ruta para mostrar todas las detecciones de fuga de gas
router.get('/gas', mostrarTodasLasDeteccionesFugaGas);

// Ruta para mostrar la última detección de fuga de gas
router.get('/gas/ultima', mostrarUltimaDeteccionFugaGas);



//  sensor de movimiento
router.post('/movimiento', registrarMovimiento);

router.get('/movimiento/ultimo', obtenerUltimoMovimiento); // Obtener el último movimiento registrado
router.get('/movimiento', obtenerTodosLosMovimientos); // Obtener todos los  movimientos registrados

router.get('/buscar', buscarMovimientosPorFecha);
export default router;
