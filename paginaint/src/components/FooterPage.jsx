import React from 'react';

const FooterPage = () => {
  return (
    <footer style={styles.footer}>
      <p>© 2024 Astooz. Todos los derechos reservados.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#003094',
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
    position: 'fixed',
    bottom: '0',
    width: '100%',
    left: 0,
  },
};

export default FooterPage;
