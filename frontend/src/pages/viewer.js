import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import TechRadar from "../components/TechRadar";
import { getPublishedTechnologies } from "../api/technology";
import { transformTechnologies } from "../utils/transform";

const Viewer = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getPublishedTechnologies(token);
        setEntries(transformTechnologies(data));
      } catch (err) {
        console.error("Error fetching technologies:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <TechRadar entries={entries} />
      </Box>
    </div>
  );
};

export default Viewer;
