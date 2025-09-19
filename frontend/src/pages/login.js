import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box } from "@mui/material";
import { AppProvider, SignInPage } from "@toolpad/core";
import { createTheme } from "@mui/material/styles";
import { jwtDecode } from "jwt-decode";

const theme = createTheme();

const providers = [{ id: "credentials" }];

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 > Date.now()) {
          navigate("/viewer");
        }
      } catch (err) {
        console.warn("Invalid stored token, ignoring");
      }
    }
  }, [navigate]);

  const signIn = async (provider, params) => {
    if (provider.id !== "credentials") return;

    try {
      const dataJSON = JSON.stringify({
        email: params.get("email"),
        password: params.get("password"),
      });
      console.log(dataJSON);
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJSON,
      });

      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();

      localStorage.setItem("token", data.token);

      navigate("/viewer");
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
