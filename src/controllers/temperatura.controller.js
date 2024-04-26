import Temperatura from '../models/temperatura.model.js';

// Constantes para los valores máximo y mínimo permitidos
const valorMaximoTemperatura = 40;
const valorMinimoTemperatura = 0;
const valorMaximoHumedad = 100;
const valorMinimoHumedad = 0;

export const subirTemperatura = async (req, res) => {
    const { temperatura, humedad } = req.body;
    try {
        // Verificar si la temperatura excede los límites
        if (temperatura > valorMaximoTemperatura || temperatura < valorMinimoTemperatura) {
            return res.status(400).json({ message: 'La temperatura excede los límites permitidos' });
        }

        // Verificar si la humedad excede los límites
        if (humedad > valorMaximoHumedad || humedad < valorMinimoHumedad) {
            return res.status(400).json({ message: 'La humedad excede los límites permitidos' });
        }

        const nuevaTemperatura = new Temperatura({
            temperatura,
            humedad,
        });

        console.log(nuevaTemperatura);

        await nuevaTemperatura.save();
        res.status(201).json({ message: 'Temperatura subida correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la temperatura' });
    }
}

export const mostrarUltimaTemperatura = async (req, res) => {
    try {
        const ultimaTemperatura = await Temperatura.findOne().sort({ _id: -1 }).limit(1);
        if (!ultimaTemperatura) {
            return res.status(404).json({ message: "No se encontraron datos de temperatura" });
        }
        res.json(ultimaTemperatura);
    } catch (error) {
        console.error("Error al obtener el último valor de la temperatura:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
}

export const mostrarTodasLasTemperaturas = async (req, res) => {
    try {
        const temperaturas = await Temperatura.find();
        res.json(temperaturas);
    } catch (error) {
        console.error("Error al obtener las temperaturas:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
}
