import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gasSchema = new Schema({
    
    fecha: {
        type: Date,
        default: Date.now
    },
    fugaDetectada: {
        type: Boolean,
        default: false // Inicialmente no se detecta fuga de gas
    },
   
});

const Gas = mongoose.model('Gas', gasSchema);

export default Gas;
