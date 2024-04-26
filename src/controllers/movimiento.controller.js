import Movimiento from '../models/movimiento.model.js';

// Controlador para registrar un movimiento
export const registrarMovimiento = async (req, res) => {
    const { detectado } = req.body;
    try {
        const nuevoMovimiento = new Movimiento({
            detectado
        });

        await nuevoMovimiento.save();
        
        let message = '';
        if (detectado) {
            message = '¡Alerta! Se ha detectado un movimiento.';
        } else {
            message = 'No se han detectado movimientos actualmente.';
        }

        // Enviar una respuesta al cliente con el mensaje y el estado de detección
        res.status(201).json({ message, detectado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el movimiento' });
    }
}


// Controlador para obtener el último movimiento registrado
export const obtenerUltimoMovimiento = async (req, res) => {
    try {
        const ultimoMovimiento = await Movimiento.findOne().sort({ createdAt: -1 }).limit(1);
        if (!ultimoMovimiento) {
            return res.status(404).json({ message: "No se encontraron datos de movimiento" });
        }
        res.json(ultimoMovimiento);
    } catch (error) {
        console.error("Error al obtener el último movimiento:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
}

// Controlador para obtener todos los movimientos registrados
export const obtenerTodosLosMovimientos = async (req, res) => {
    try {
        const movimientos = await Movimiento.find();
        res.json(movimientos);
    } catch (error) {
        console.error("Error al obtener los movimientos:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
}
export const buscarMovimientosPorFecha = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query;

        // Registros de depuración
        console.log("Fecha de inicio recibida:", fechaInicio);
        console.log("Fecha de fin recibida:", fechaFin);

        // Validar las fechas
        const fechaInicioValida = new Date(fechaInicio);
        const fechaFinValida = new Date(fechaFin);

        console.log("Fecha de inicio válida:", fechaInicioValida);
        console.log("Fecha de fin válida:", fechaFinValida);

        if (isNaN(fechaInicioValida.getTime()) || isNaN(fechaFinValida.getTime())) {
            return res.status(400).json({ message: 'Las fechas proporcionadas son inválidas.' });
        }

        const movimientos = await Movimiento.find({
            fecha: {
                $gte: fechaInicioValida,
                $lte: fechaFinValida
            }
        });

        res.json(movimientos);
    } catch (error) {
        console.error("Error al buscar movimientos por fecha:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
}
