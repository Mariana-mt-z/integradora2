// import Sensor from './models/Sensor';
// import { getSensorById, createSensor, getAllSensors, 
//     updateSensor, deleteSensor } from '../controllers/sensor.controller.js';

// // Función para obtener un sensor por su ID
// const getSensorById = async (sensorId) => {
//     try {
//         const sensor = await Sensor.findById(sensorId);
//         if (!sensor) {
//             throw new Error('Sensor no encontrado');
//         }
//         return sensor;
//     } catch (error) {
//         console.error('Error al obtener el sensor:', error.message);
//         throw error;
//     }
// };

// // Función para actualizar un sensor
// const updateSensor = async (sensorId, newData) => {
//     try {
//         const updatedSensor = await Sensor.findByIdAndUpdate(sensorId, newData, { new: true });
//         if (!updatedSensor) {
//             throw new Error('Sensor no encontrado');
//         }
//         console.log('Sensor actualizado correctamente:', updatedSensor);
//         return updatedSensor;
//     } catch (error) {
//         console.error('Error al actualizar el sensor:', error.message);
//         throw error;
//     }
// };

// // Función para eliminar un sensor
// const deleteSensor = async (sensorId) => {
//     try {
//         const deletedSensor = await Sensor.findByIdAndDelete(sensorId);
//         if (!deletedSensor) {
//             throw new Error('Sensor no encontrado');
//         }
//         console.log('Sensor eliminado correctamente');
//         return deletedSensor;
//     } catch (error) {
//         console.error('Error al eliminar el sensor:', error.message);
//         throw error;
//     }
// };

// export { getSensorById, createSensor, getAllSensors, updateSensor, deleteSensor };

