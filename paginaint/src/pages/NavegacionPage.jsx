import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPlus, FaPhone, FaGasPump, FaRunning, FaThermometerHalf } from 'react-icons/fa';
import logo from "../assets/astooz-png.png";

function NavegacionPage() {
  return (
    <div className="drawerContent">
      <div style={styles.iconContainer}>
        <img
          src={logo}
          className="logo"
          alt="Logo"
          style={{
            width: "100px",
            height: "auto", 
            borderRadius: "50%", 
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)", 
          }}
        />
      </div>
      <ul className="drawerItemList">
        <li style={styles.menuItem}>
          <Link to="/inicio"><FaHome /> Inicio</Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/movimiento"><FaRunning /> Sensor de movimiento</Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/gas"><FaGasPump /> Sensor de gas</Link>
        </li>
      
        <li style={styles.menuItem}>
          <Link to="/temperatura"><FaThermometerHalf /> Sensor de temperatura</Link>
          </li>
          <li style={styles.menuItem}>
          <Link to="/contacto"><FaPhone /> Contacto</Link>
        </li>
          <li style={styles.menuItem}>
          <Link to="/mas"><FaPlus /> Nosotros</Link>
        </li>  
      </ul>
      <div className="content">
        {/* Aquí se renderizará el contenido de las páginas */}
      </div>
    </div>
  );
}

const styles = {
  iconContainer: {
  
    borderBottom: "1px solid #4285F4", // Línea que divide el contenedor del icono
    paddingBottom: "10px", // Espacio inferior para separar el icono
    marginBottom: "20px", // Espacio inferior para separar el contenedor del texto
    marginLeft: "-10px", // Margen negativo para compensar el espacio adicional generado por el borde
    marginRight: "-10px", // Margen negativo para compensar el espacio adicional generado por el borde
  },
  menuItem: {
    marginBottom: "10px", // Espacio inferior entre elementos del menú
    borderBottom: "1px solid #ccc", // Línea gris que divide los elementos
    paddingBottom: "5px", // Espacio inferior para separar los elementos
  },
};

export default NavegacionPage;
