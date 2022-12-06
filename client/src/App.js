import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import { themeSettings } from './theme';
import Navbar from './scenes/navbar';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<Navbar />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/profile/:userId' element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
