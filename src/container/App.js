import React from 'react';
import Header from '../components/Header.js';
import Dashboard from './Dashboard.js';
import ApplicationGrid from './ApplicationGrid.js';

import '../styles/_mixins/_carbon.scss';

function App() {
  return (
    <div className="App">
      <ApplicationGrid>
        <Header />
        <Dashboard />
      </ApplicationGrid>
    </div>
  );
}

export default App;
