// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, amber, indigo } from '@material-ui/core/colors';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Router } from './app/screens/Router/Router';
import * as serviceWorker from './serviceWorker';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { UserProvider } from './app/context';

const element = document.getElementById('root');

if (!element) throw new Error("Couldn't find element with id root");

const theme = createMuiTheme({
  palette: {
    primary: { main: '#005daa' },
    secondary: {
      main: '#039be5',
      light: amber[200],
      dark: amber[700],
    },
    // type: 'dark',
  },
  spacing: 10,
});
const user = { name: '', loggedIn: true };

const renderApp = (
  <UserProvider value={user}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastContainer />
        <Router />
      </BrowserRouter>
    </MuiThemeProvider>
  </UserProvider>
);

ReactDOM.render(renderApp, element);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
