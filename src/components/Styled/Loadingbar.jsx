import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

function Loadingbar() {
  return (
    <div className="loading">
      <LoadingBar style={{ backgroundColor: '#6465d0', height: '2px' }} />
    </div>
  );
}

export default Loadingbar;
