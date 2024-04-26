import mongoose from 'mongoose';


// Definir el esquema del sensor de temperatura y humedad
const temperatura= new mongoose.Schema({
    temperatura: {
        type: Number,
        required: true
    },
    humedad: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }

},

);


export default mongoose.model("Temperatura", temperatura);
