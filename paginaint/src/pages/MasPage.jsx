import React from "react";
import image111 from "../assets/2.jpeg";
import NavigationBar from './NavigationBar';
import FooterPage from '../components/FooterPage';

const MasPage = () => {
    return (
        <div style={styles.container}>
            <NavigationBar />
            <div style={styles.contentContainer}>
                <div style={styles.textContainer}>
                    <h1 style={styles.header}>Sobre Nosotros</h1>
                    <p style={styles.text}>
                        Nuestro objetivo principal es mejorar la eficiencia operativa y la calidad en la ejecución de proyectos de construcción, consolidando así la posición de nuestra empresa como líder en el mercado local.
                        <br />
                        Buscamos establecer estándares más altos en términos de diseño, construcción y seguridad residencial.
                        <br />
                        Para alcanzar este objetivo general, nos enfocaremos en implementar un sistema de gestión de proyectos basado en tecnología avanzada, fomentar una cultura de innovación y mejora continua, y establecer alianzas estratégicas con proveedores y contratistas para garantizar la calidad y la eficiencia en la ejecución de los proyectos.
                    </p>
                </div>
                <div style={styles.imageContainer}>
                    <img
                        src={image111}
                        alt="Sobre Nosotros"
                        style={styles.image}
                    />
                </div>
            </div>
            <FooterPage /> 
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        background: '#ffffff', 
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    },
    textContainer: {
        flex: '1',
        marginLeft: '80px', 
    },
    imageContainer: {
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '30px', 
    },
    image: {
        width: '50%',
        height: 'auto',
        borderRadius: '7px',
    },
    text: {
        fontSize: '20px',
        textAlign: 'justify',
        color: '#545454',
        fontFamily: 'sans-serif',
    },
    header: {
        fontSize: '60px',
        textAlign: 'justify',
        color: '#042D54',
        fontFamily: 'BebasNeue-Regular',
    },
};

export default MasPage;
