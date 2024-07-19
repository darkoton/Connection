import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import router from '@/router/index';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@/assets/style/main.scss';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App router={router()}></App>
    </ThemeProvider>
    {/* <App router={router()}></App> */}
  </React.StrictMode>,
);
