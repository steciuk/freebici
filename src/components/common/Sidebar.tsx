import React from 'react';
import useToggle from 'src/hooks/util/useToggle';
import { Children } from 'src/utils/types/Children';

import CloseIcon from '@mui/icons-material/Close';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Button } from '@mui/material';

const Sidebar = (props: { children?: Children }) => {
  const [showSidebar, toggleShowSidebar] = useToggle(true);

  return (
    <div
      css={{
        width: '20rem',
        position: 'absolute',
        top: '0',
        right: showSidebar ? '0' : `-20rem`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        zIndex: 1000,
        backgroundColor: 'white', // TODO: change to theme
        padding: '2rem',
        transition: 'right 0.5s',
        borderRadius: '0 0 0 0.5rem',
        '@media (min-width: 1000px)': {
          right: 0,
        },
      }}
    >
      <div
        css={{
          position: 'absolute',
          top: '0',
          left: '-2rem',
          width: '2rem',
          height: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white', // TODO: change to theme
          borderRadius: '0 0 0 0.5rem',
          '@media (min-width: 1000px)': {
            display: 'none',
          },
        }}
      >
        <Button onClick={() => toggleShowSidebar()}>
          {showSidebar ? <CloseIcon /> : <MenuOpenIcon />}
        </Button>
      </div>
      {props.children}
    </div>
  );
};

export default Sidebar;
