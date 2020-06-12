import React from 'react';
// Material
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { IconButton } from '@material-ui/core';
// Store
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkModeAction } from '../../store/actions';

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const darkModeTheme = useSelector(state => state.darkModeTheme);
  const handleThemeChange = () => dispatch(toggleDarkModeAction());
  return (
    <IconButton className="theme-switch" onClick={() => handleThemeChange()}>
      {darkModeTheme.isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

export default DarkModeToggle
