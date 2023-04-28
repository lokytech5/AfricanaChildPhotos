import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "swiper/swiper-bundle.min.css";
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from '../src/redux/store'
import { loadUser } from './redux/userSlice';



store.dispatch(loadUser());


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>


);

