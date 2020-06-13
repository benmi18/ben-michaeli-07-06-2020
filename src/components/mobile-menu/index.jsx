import React, { Fragment, useState, useRef } from 'react'
import { IconButton, Popper, Paper, ClickAwayListener, MenuList, MenuItem, Grow } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

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

  const toggleHamburgerMenu = () => setOpen(prevOpen => !prevOpen);
  return (
    <Fragment>
      <IconButton
        className="hamburger-btn"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={toggleHamburgerMenu}
      >
        {!open ? <MenuIcon /> : <MenuOpenIcon />}
      </IconButton>
      <Popper className="dropdown-menu" open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <NavLink className="reset-link-style" to="/ben-michaeli-07-06-2020">
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
    </Fragment>
  )
}

export default MobileMenu
