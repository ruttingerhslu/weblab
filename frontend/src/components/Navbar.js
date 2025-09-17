import * as React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          Technology Radar
        </Typography>

        {/* Links */}
        <Button color="inherit" component={RouterLink} to="/admin">
          Admin
        </Button>
        <Button color="inherit" component={RouterLink} to="/viewer">
          Viewer
        </Button>
      </Toolbar>
    </AppBar>
  );
}
