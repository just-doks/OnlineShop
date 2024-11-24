
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';
import BasketStore from './store/BasketStore';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export const Context = createContext(null)

console.log(process.env.REACT_APP_API_URL)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    device: new DeviceStore(),
    basket: new BasketStore()
  }}>
    <App />
  </Context.Provider>
);

