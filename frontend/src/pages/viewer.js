import { useEffect, useState, lazy, Suspense } from "react";
import Box from "@mui/material/Box";

import Navbar from "../components/Navbar";
import { getPublishedTechnologies } from "../api/technology";
import { transformTechnologies } from "../utils/transform";

const TechRadar = lazy(() => import("../components/TechRadar.js"));

const Viewer = () => {
  const [entries, setEntries] = useState(() => {
    const cached = localStorage.getItem("technologies");
    if (cached) {
      try {
        return transformTechnologies(JSON.parse(cached));
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const data = await getPublishedTechnologies(token);
        const transformed = transformTechnologies(data);

        setEntries(transformed);
        localStorage.setItem("technologies", JSON.stringify(data));
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
        <Suspense fallback={<div>Loading Radar...</div>}>
          <TechRadar entries={entries} />
        </Suspense>
      </Box>
    </div>
  );
};

export default Viewer;
