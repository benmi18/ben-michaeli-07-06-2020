import React, { useState, useRef } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
// Material
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { Button, Typography, Toolbar, AppBar, IconButton, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// Actions
import { toggleDarkModeAction } from "../../store/actions";
// Components
import TemperatureUnitToggle from '../temperature-unit-toggle';
// Style
import './index.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  }
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const ToggleHamburgerMenu = () => setOpen(prevOpen => !prevOpen);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };
  const handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const darkModeTheme = useSelector(state => state.darkModeTheme);
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleThemeChange = () => dispatch(toggleDarkModeAction());

  return (
    <div className={classes.root}>
      <AppBar className="app-bar" position="static">
        <Toolbar className="toolbar">
          {/* Mobile menu */}
          <div className="mobile-menu">
            <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={ToggleHamburgerMenu}
            >
              <IconButton className="hamburger-btn">
                {!open ? <MenuIcon /> : <MenuOpenIcon />}
              </IconButton>
            </Button>
            <Popper className="dropdown-menu" open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <NavLink className="reset-link-style" to="/">
                          <MenuItem onClick={handleClose}>
                            Home
                          </MenuItem>
                        </NavLink>
                        <NavLink className="reset-link-style" to="/favorites">
                          <MenuItem onClick={handleClose}>
                            Favorites
                          </MenuItem>
                        </NavLink>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>

          <Typography variant="h6" className={classes.title}>
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
          <IconButton className="theme-switch" onClick={() => handleThemeChange()}>
            {darkModeTheme.isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
