import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import TechForm from "../components/TechForm";

const Admin = () => {
  return (
    <div>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <TechForm />
      </Box>
    </div>
  );
};

export default Admin;
