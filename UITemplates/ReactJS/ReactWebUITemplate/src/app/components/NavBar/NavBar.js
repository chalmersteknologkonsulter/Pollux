// @flow

import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

type Props = {};

/**
 * Navbar
 * Custom component using material-ui AppBar, ToolBar and Typography
 */
const NavBar = (props: Props) => (
  <AppBar position="relative">
    <Toolbar>
      <Typography variant="h6" color="inherit" noWrap>
        CTK-IT
      </Typography>
    </Toolbar>
  </AppBar>
);

export default NavBar;
