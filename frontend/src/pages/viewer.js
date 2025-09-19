import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import TechRadar from "../components/TechRadar";

const categoryToQuadrant = {
  Techniques: 0,
  Tools: 1,
  Platforms: 2,
  "Languages & Frameworks": 3,
};

const maturityToRing = {
  Adopt: 0,
  Trial: 1,
  Assess: 2,
  Hold: 3,
};

function transformTechnologies(data) {
  return data.map((tech) => ({
    label: tech.name,
    quadrant: categoryToQuadrant[tech.category] ?? 0,
    ring: maturityToRing[tech.maturity] ?? 3,
    moved: 0,
  }));
}

const Viewer = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:8080/technologies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
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
      <Box sx={{ display: "flex" }}>
        <TechRadar entries={entries} /> {/* pass real data */}
      </Box>
    </div>
  );
};

export default Viewer;
