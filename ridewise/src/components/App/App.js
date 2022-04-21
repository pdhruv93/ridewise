import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import customTheme from '../Theme/Theme';
import Navbar from '../Navbar/Navbar';
import ToastNotification from '../ToastNotification';
import HomeScreen from '../../screens/HomeScreen';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={DateAdapter}>
            <Navbar />
            <ToastNotification />
            <HomeScreen />
          </LocalizationProvider>
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
