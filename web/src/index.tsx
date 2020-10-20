import 'stop-runaway-react-effects/hijack';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { ChakraProvider } from '@chakra-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FIVE_SECONDS = 5000;

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer
      position="bottom-left"
      autoClose={FIVE_SECONDS}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
