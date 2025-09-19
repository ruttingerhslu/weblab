import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function getUserRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }
    return decoded.role;
  } catch {
    return null;
  }
}

export default function Navbar() {
  const role = getUserRole();

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

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

        {role === "admin" && (
          <Button color="inherit" component={RouterLink} to="/admin">
            Admin
          </Button>
        )}
        {["admin", "user"].includes(role) && (
          <Button color="inherit" component={RouterLink} to="/viewer">
            Viewer
          </Button>
        )}

        {["admin", "user"].includes(role) && (
          <IconButton color="inherit" aria-label="logout" onClick={logOut}>
            <LogoutIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
