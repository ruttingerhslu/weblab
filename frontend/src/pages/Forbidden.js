import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";
import BlockIcon from "@mui/icons-material/Block";

export default function Forbidden() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        p: 3,
      }}
    >
      <BlockIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
      <Typography variant="h2" gutterBottom>
        403 - Forbidden
      </Typography>
      <Typography variant="body1" align="center" sx={{ maxWidth: 400, mb: 3 }}>
        Sorry, you don't have permission to access this page.  
        If you think this is a mistake, please contact your administrator.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Back to Home
      </Button>
    </Box>
  );
}
