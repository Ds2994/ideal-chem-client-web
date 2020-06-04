import React from 'react';
import './App.css';
import Navbar from './Layout/Drawer/Navbar';
import { HashRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './store/reducer';

function App() {

  const appStore = createStore(reducer);

  return (
    <Provider store={appStore}>
      <HashRouter>
        <div className="App">
          <Navbar/>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
