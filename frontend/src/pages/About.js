import React from "react";
import { Box, Typography, Link } from "@mui/material";

export default function About() {
  return (
    <div>
      <Box sx={{ m: 4 }}>
        <Typography variant="h4" gutterBottom>
          About
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          A technology radar is a tool that helps organizations evaluate and
          visualize technologies over time. It usually categorizes technologies
          into rings such as <Box component="em">Adopt</Box>,{" "}
          <Box component="em">Trial</Box>, <Box component="em">Assess</Box>, and{" "}
          <Box component="em">Hold</Box>.
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          The goal is to guide teams in choosing the right tools, frameworks,
          and practices by providing a shared, evolving perspective.
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Inspired by{" "}
          <Link href="https://www.thoughtworks.com/radar" color="inherit">
            {"ThoughtWorks Technology Radar"}
          </Link>
          .
        </Typography>
      </Box>
    </div>
  );
}
