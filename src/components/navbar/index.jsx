import React from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
// Material
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { Button, Typography, Toolbar, AppBar, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// Actions
import { toggleDarkModeAction } from "../../store/actions";
// Components
import TemperatureUnitToggle from '../temperature-unit-toggle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navigationLinks: {
    border: '1px solid',
    borderRadius: '3px'
  },
  resetLinkStyle: {
    color: 'inherit',
    textDecoration: 'inherit'
  },
  themeSwitch: {
    marginLeft: '5px',
    color: 'inherit'
  },
  activeLink: {
    color: '#90caf9'
  }
}));

const Navbar = () => {
  const darkModeTheme = useSelector(state => state.darkModeTheme);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleThemeChange = () => {
    dispatch(toggleDarkModeAction());
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Herolo Weather Task
          </Typography>
          <TemperatureUnitToggle />
          <div className={classes.navigationLinks}>
            <NavLink className={classes.resetLinkStyle} to="/">
              <Button color="inherit">Home</Button>
            </NavLink>
            <NavLink className={classes.resetLinkStyle} to="/favorites">
              <Button color="inherit">Favorites</Button>
            </NavLink>
          </div>
          <IconButton className={classes.themeSwitch} onClick={() => handleThemeChange()}>
            {darkModeTheme.isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
