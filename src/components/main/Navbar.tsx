import React from 'react';
import { Link } from 'react-router-dom';
import useToggle from 'src/hooks/util/useToggle';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';

const PATHS: { path: string; name: string }[] = [
  { path: '/heatmap', name: 'Heatmap' },
  { path: '/history', name: 'History' },
  { path: '/finder', name: 'Finder' },
];

const navbarHeight = '3.5rem';

const Navbar = () => {
  const [navbarOpened, toggleNavbarOpened] = useToggle(false);

  return (
    <div
      css={{
        height: navbarHeight,
        display: 'grid',
        gridTemplateColumns: '8rem 1fr',
        backgroundColor: 'hsl(230deg, 48%, 47%)',
        color: 'white',
        flexShrink: 0,
      }}
    >
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          fontSize: '1.5rem',
          fontWeight: 500,
          paddingLeft: '1rem',
        }}
      >
        <Link to="/">FreeBici</Link>
      </div>

      <nav
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          paddingRight: '1rem',
          gap: '1rem',
          '@media (width < 500px)': {
            display: 'none',
          },
        }}
      >
        {PATHS.map((path) => (
          <Link key={path.path} to={path.path}>
            <div
              css={{
                backgroundColor: '#023047',
                padding: '0.5rem',
                borderRadius: '0.2rem',
                transition: 'background-color 0.2s',
                '&:hover': {
                  backgroundColor: 'hsl(230deg, 48%, 94%)',
                  color: '#1a535c',
                },
              }}
            >
              {path.name}
            </div>
          </Link>
        ))}
      </nav>
      <div
        css={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          '@media (width >= 500px)': {
            display: 'none',
          },
        }}
      >
        <Button onClick={() => toggleNavbarOpened()}>
          {navbarOpened ? (
            <CloseIcon
              css={{
                color: 'white',
                fontSize: '2rem',
              }}
            />
          ) : (
            <MenuIcon
              css={{
                color: 'white',
                fontSize: '2rem',
              }}
            />
          )}
        </Button>
        {navbarOpened && (
          <>
            <div
              className="backdrop"
              css={{
                position: 'fixed',
                top: navbarHeight,
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1002,
              }}
              onClick={() => toggleNavbarOpened()}
            />
            <nav
              css={{
                position: 'absolute',
                top: navbarHeight,
                right: 0,
                backgroundColor: 'hsl(230deg, 48%, 47%)',
                padding: '0.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                zIndex: 1002,
              }}
            >
              {PATHS.map((path) => (
                <Link key={path.path} to={path.path}>
                  <div
                    css={{
                      backgroundColor: '#023047',
                      padding: '0.5rem',
                      borderRadius: '0.2rem',
                      transition: 'background-color 0.2s',
                      '&:hover': {
                        backgroundColor: 'hsl(230deg, 48%, 94%)',
                        color: '#1a535c',
                      },
                    }}
                  >
                    {path.name}
                  </div>
                </Link>
              ))}
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
