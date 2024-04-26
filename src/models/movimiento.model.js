import mongoose from 'mongoose';

const movimientoSchema = new mongoose.Schema({
    detectado: {
        type: Boolean,
        required: true
    },
    
    fecha: {
        type: Date,
        default: Date.now
    }
});

const Movimiento = mongoose.model('Movimiento', movimientoSchema);

export default Movimiento;
