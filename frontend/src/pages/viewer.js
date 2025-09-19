import { Box, Typography } from "@mui/material";

import Navbar from "../components/Navbar";

const Viewer = () => {
  return (
    <div>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Typography variant="h4">Technology radar viewer</Typography>
      </Box>
    </div>
  );
};

export default Viewer;
