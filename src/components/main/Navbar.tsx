import React from 'react';

const Navbar = () => {
  return (
    <nav
      css={{
        height: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3f51b5',
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: 500,
      }}
    >
      FreeBici
    </nav>
  );
};

export default Navbar;
