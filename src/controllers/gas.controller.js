import Gas from '../models/gas.model.js';

// Controlador para subir una detección de fuga de gas
export const subirDeteccionFugaGas = async (req, res) => {
    const { fugaDetectada } = req.body;
    try {
        const nuevaDeteccionFugaGas = new Gas({
            fugaDetectada,
        });

        await nuevaDeteccionFugaGas.save();
        
        let message = '';
        if (fugaDetectada) {
            message = '¡Alerta! Se ha detectado una fuga de gas';
        } else {
            message = 'No se han detectado fugas de gas actualmente.';
        }

        // Enviar una respuesta al cliente con el mensaje adecuado
        res.status(201).json({ message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar la detección de fuga de gas' });
    }
}

// Controlador para mostrar todas las detecciones de fuga de gas
export const mostrarTodasLasDeteccionesFugaGas = async (req, res) => {
    try {
        const deteccionesFugaGas = await Gas.find();
        res.json(deteccionesFugaGas);
    } catch (error) {
        console.error("Error al obtener las detecciones de fuga de gas:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
}


// Controlador para mostrar la última detección de fuga de gas
export const mostrarUltimaDeteccionFugaGas = async (req, res) => {
    try {
        const ultimaDeteccionFugaGas = await Gas.findOne().sort({ fecha: -1 }).limit(1);
        if (!ultimaDeteccionFugaGas) {
            return res.status(404).json({ message: "No se encontraron datos de detección de fuga de gas" });
        }
        res.json(ultimaDeteccionFugaGas);
    } catch (error) {
        console.error("Error al obtener la última detección de fuga de gas:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
}
