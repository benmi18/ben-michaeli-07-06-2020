import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useSelector } from 'react-redux';

// Material
import { Paper } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// components
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Favorites from "./pages/favorites";


function App() {
  const darkModeTheme = useSelector(state => state.darkModeTheme);

  const darkTheme = createMuiTheme({
    palette: {
      type: darkModeTheme.palletteType,
      primary: darkModeTheme.primaryColor
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper style={{height: '100vh'}}>
        <div className="App">
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/favorites">
                <Favorites />
              </Route>
            </Switch>
          </Router>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
