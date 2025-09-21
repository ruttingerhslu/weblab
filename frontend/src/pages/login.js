import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box } from "@mui/material";
import { AppProvider, SignInPage } from "@toolpad/core";
import { createTheme } from "@mui/material/styles";

import { login } from "../api/auth";
import { isTokenValid, getUserRole } from "../utils/jwt";

const theme = createTheme();
const providers = [{ id: "credentials" }];

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      const role = getUserRole(token);
      navigate(role === "admin" ? "/admin" : "/viewer");
    }
  }, [navigate]);

  const signIn = async (provider, params) => {
    if (provider.id !== "credentials") return;

    try {
      const data = await login({
        email: params.get("email"),
        password: params.get("password"),
      });

      localStorage.setItem("token", data.token);

      const role = getUserRole(data.token);
      navigate(role === "admin" ? "/admin" : "/viewer");
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ width: "100%", height: "100vh" }}>
        <AppProvider theme={theme}>
          <SignInPage
            signIn={signIn}
            providers={providers}
            slotProps={{
              emailField: { autoFocus: true },
              form: { noValidate: true },
            }}
          />
        </AppProvider>
      </Box>
    </Container>
  );
};

export default Login;
