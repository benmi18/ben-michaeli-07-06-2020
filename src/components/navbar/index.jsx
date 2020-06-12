import React from 'react';
import { NavLink } from "react-router-dom";
// Material
import { Button, Typography, Toolbar, AppBar } from '@material-ui/core';
// Components
import TemperatureUnitToggle from '../temperature-unit-toggle';
import MobileMenu from '../mobile-menu';
// Style
import './index.css';
import DarkModeToggle from '../dark-mode-toggle';

const Navbar = () => (
  <div className="navbar">
    <AppBar className="app-bar" position="static">
      <Toolbar className="toolbar">
        <div className="mobile-menu">
          <MobileMenu />
        </div>
        <Typography variant="h6" className="title">
          Herolo Weather Task
        </Typography>
        <TemperatureUnitToggle />
        <div className="navigation-links">
          <NavLink className="reset-link-style" to="/">
            <Button color="inherit">Home</Button>
          </NavLink>
          <NavLink className="reset-link-style" to="/favorites">
            <Button color="inherit">Favorites</Button>
          </NavLink>
        </div>
        <DarkModeToggle />
      </Toolbar>
    </AppBar>
  </div>
);

export default Navbar;
