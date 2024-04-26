import React, { useState } from 'react';
import NavigationBar from './NavigationBar'; 
import FooterPage from '../components/FooterPage';

function ContactoPage() {
    const [mensaje, setMensaje] = useState('');

    const handleMensajeChange = (event) => {
        setMensaje(event.target.value);
    };

    const enviarMensaje = () => {
        const numeroWhatsApp = '526181815349';
        const mensajeEncoded = encodeURIComponent(mensaje);
        const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensajeEncoded}`;
        window.location.href = url;
    };

    const styles = {
        container: {
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
        },
        titulo: {
            fontSize: '36px',
            marginBottom: '20px',
            color: '#042D54',
            fontFamily: 'BebasNeue-Regular',
            textAlign: 'center',
        },
        textarea: {
            width: '100%',
            height: '150px',
            padding: '10px',
            marginBottom: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
        },
        boton: {
            backgroundColor: '#4CAF50',
            border: 'none',
            color: 'white',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'block',
            width: '100%',
            fontSize: '18px',
            margin: '0 auto',
            cursor: 'pointer',
            borderRadius: '5px',
            marginBottom: '10px',
        },
        alternativa: {
            textAlign: 'center',
            fontSize: '14px',
            color: '#333',
            marginTop: '10px',
        },
    };

    return (
        <>
            <NavigationBar />
            <div style={styles.container}>
                <h1 style={styles.titulo}>Contáctanos</h1>
                <div>
                    <label htmlFor="mensaje" style={{ fontSize: '18px', marginBottom: '10px', display: 'block' }}>Escribe tu mensaje:</label>
                    <textarea id="mensaje" value={mensaje} onChange={handleMensajeChange} style={styles.textarea} required></textarea>
                </div>
                <div>
                    <button onClick={enviarMensaje} style={styles.boton}>Enviar mensaje por WhatsApp</button>
                    <p style={styles.alternativa}>Si no tienes WhatsApp, puedes llamar al siguiente número:  618 181 5349</p>
                </div>
            </div>
            <FooterPage /> 
        </>
    );
}

export default ContactoPage;
