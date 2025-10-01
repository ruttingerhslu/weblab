import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export default function NotFound() {
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
      <SearchOffIcon sx={{ fontSize: 80, color: "warning.main", mb: 2 }} />
      <Typography variant="h2" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" align="center" sx={{ maxWidth: 400, mb: 3 }}>
        The page you're looking for doesn't exist or has been moved.  
        Check the URL or return to the home page.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Back to Home
      </Button>
    </Box>
  );
}
