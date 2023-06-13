import React from 'react';
import Spinner from 'src/components/common/Spinner/Spinner';

const Loader = () => {
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Spinner />
    </div>
  );
};

export default Loader;
