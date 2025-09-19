import { useEffect } from "react";

export default function TechRadar({ entries }) {
  useEffect(() => {
    if (!entries.length) return;
    const loadScripts = async () => {
      await new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://d3js.org/d3.v7.min.js";
        script.onload = resolve;
        document.body.appendChild(script);
      });

      await new Promise((resolve) => {
        const script = document.createElement("script");
        script.src =
          "https://zalando.github.io/tech-radar/release/radar-0.12.js";
        script.onload = resolve;
        document.body.appendChild(script);
      });

      window.radar_visualization({
        svg_id: "radar",
        width: 1450,
        height: 1000,
        title: "Technology Radar",
        quadrants: [
          { name: "Languages & Frameworks" },
          { name: "Platforms" },
          { name: "Techniques" },
          { name: "Tools" },
        ],
        rings: [
          { name: "Adopt", color: "#5ba300" },
          { name: "Trial", color: "#009eb0" },
          { name: "Assess", color: "#c7ba00" },
          { name: "Hold", color: "#e09b96" },
        ],
        entries,
      });
    };

    loadScripts();
  }, [entries]);

  return <svg id="radar"></svg>;
}
