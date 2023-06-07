import React from 'react';
import { Link } from 'react-router-dom';
import useToggle from 'src/hooks/util/useToggle';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';

const PATHS: { path: string; name: string }[] = [
  { path: '/heatmap', name: 'Heatmap' },
  { path: '/historic', name: 'Historic' },
  { path: '/finder', name: 'Finder' },
];

const Navbar = () => {
  const [navbarOpened, toggleNavbarOpened] = useToggle(false);

  return (
    <div
      css={{
        height: '3rem',
        display: 'grid',
        gridTemplateColumns: '8rem 1fr',
        backgroundColor: '#3f51b5',
        color: 'white',
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
                  backgroundColor: '#219ebc',
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
          <nav
            css={{
              position: 'absolute',
              top: '3rem',
              right: 0,
              backgroundColor: '#3f51b5',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              zIndex: 1001,
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
                      backgroundColor: '#219ebc',
                    },
                  }}
                >
                  {path.name}
                </div>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
};

export default Navbar;
