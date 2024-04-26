import React, { useState } from 'react';
import { FaBars, FaTimes, FaUser, FaHome, FaPlus, FaPhone, FaGasPump, FaRunning, FaThermometerHalf } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/Auth.Context';
import Swal from 'sweetalert2';
import NavegacionPage from './NavegacionPage';

function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { logout } = useAuth(); 

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <nav style={styles.nav}>
      <div style={menuOpen ? styles.menuOverlay : {}} onClick={handleMenuToggle} />
      <div style={menuOpen ? styles.menuContainer : {}}>
        <div style={menuOpen ? styles.menuContent : {}}>
          {menuOpen ? (
            <FaTimes onClick={handleMenuToggle} style={{ ...styles.menuItem, ...styles.menuIcon, color: '#fff', fontSize: '25px' }} />
          ) : (
            <FaBars onClick={handleMenuToggle} style={{ ...styles.menuItem, ...styles.menuIcon, color: '#fff', fontSize: '25px' }} />
          )}
          {menuOpen && <NavegacionPage />}
        </div>
      </div>
      <div style={{ ...styles.userIcon, fontSize: '30px', right: '10px' }} onClick={handleUserMenuToggle}>
        <FaUser />
        {userMenuOpen && (
          <div style={styles.userMenu}>
            <Link to="/perfil" style={{ ...styles.menuItem, color: '#000' }}>Perfil</Link>
            <button onClick={handleLogout} style={{ ...styles.menuItem, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#000' }}>Cerrar sesión</button>
          </div>
        )}
      </div>
      {!menuOpen && (
        <div style={styles.iconContainer}>
          <Link to="/inicio"><FaHome style={{ ...styles.menuItem, ...styles.menuItemIcon, marginTop: '20px', color: '#000' }} /></Link>
          <Link to="/movimiento"><FaRunning style={{ ...styles.menuItem, ...styles.menuItemIcon, marginTop: '20px', color: '#000' }} /></Link>
          <Link to="/gas"><FaGasPump style={{ ...styles.menuItem, ...styles.menuItemIcon, marginTop: '20px', color: '#000' }} /></Link>
          <Link to="/temperatura"><FaThermometerHalf style={{ ...styles.menuItem, ...styles.menuItemIcon, marginTop: '20px', color: '#000' }} /></Link>
          <Link to="/contacto"><FaPhone style={{ ...styles.menuItem, ...styles.menuItemIcon, marginTop: '20px', color: '#000' }} /></Link>
          <Link to="/mas"><FaPlus style={{ ...styles.menuItem, ...styles.menuItemIcon, marginTop: '20px', color: '#000' }} /></Link>

        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    position: 'relative',
    backgroundColor: '#003094',
    height: 'auto',
    minHeight: '60px',
    width: '100%',
  },
  menuOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  menuContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '20%',
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 1001,
  },
  menuContent: {
    height: '100%',
    padding: '10px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  menuItem: {
    marginBottom: '10px',
    display: 'block',
    textDecoration: 'none',
  },
  menuIcon: {
    cursor: 'pointer',
    zIndex: 1002,
    fontSize: '30px',
    marginBottom: '10px',
  },
  menuItemIcon: {
    cursor: 'pointer',
    zIndex: 1002,
    fontSize: '30px',
    marginBottom: '10px',
  },
  userIcon: {
    color: '#fff',
    cursor: 'pointer',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1002,
  },
  userMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1003,
  },
  iconContainer: {
    position: 'fixed',
    top: '40%', // Ajustar la posición vertical de los iconos
    left: '10px',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 1000,
  },
};

export default NavigationBar;
