import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";

const TechRadar = ({ entries }) => {
  const publishedEntries = entries.filter((e) => e.publishedAt);

  const size = 600;
  const center = size / 2;
  const maxRadius = size / 2 - 20;

  const rings = 4;
  const quadrantColors = ["#ff6b6b", "#4dabf7", "#51cf66", "#fcc419"];

  const quadrantAngleRanges = [
    { start: -Math.PI, end: -Math.PI / 2 }, // top-left
    { start: -Math.PI / 2, end: 0 }, // top-right
    { start: Math.PI / 2, end: Math.PI }, // bottom-left
    { start: 0, end: Math.PI / 2 }, // bottom-right
  ];

  const ringLabels = ["Adopt", "Trial", "Assess", "Hold"];
  const quadrantLabels = [
    "Techniques",
    "Tools",
    "Platforms",
    "Languages & Frameworks",
  ];

  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: "relative",
        margin: "auto",
        bgcolor: "#f9f9f9",
        overflow: "visible",
      }}
    >
      {[...Array(rings)].map((_, i) => {
        const radius = ((i + 1) / rings) * maxRadius;
        return (
          <Box
            key={`ring-${i}`}
            sx={{
              position: "absolute",
              left: center - radius,
              top: center - radius,
              width: radius * 2,
              height: radius * 2,
              borderRadius: "50%",
              border: "1px solid #cfcfcf",
            }}
          />
        );
      })}

      {[...Array(rings)].map((_, i) => {
        const innerRadius = (i / rings) * maxRadius;
        const outerRadius = ((i + 1) / rings) * maxRadius;
        const rLabel = (innerRadius + outerRadius) / 2;
        const xLabel = center; // top-center
        const yLabel = center - rLabel; // above center by rLabel

        return (
          <Typography
            key={`ring-label-${i}`}
            variant="caption"
            sx={{
              position: "absolute",
              left: xLabel,
              top: yLabel - 10,
              transform: "translateX(-50%)",
              fontWeight: 700,
              color: "#111",
              pointerEvents: "none",
            }}
          >
            {ringLabels[i]}
          </Typography>
        );
      })}

      <Box
        sx={{
          position: "absolute",
          left: center,
          width: 2,
          height: 1,
          bgcolor: "#6666",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: center,
          height: 2,
          width: 1,
          bgcolor: "#6666",
        }}
      />

      {quadrantLabels.map((label, i) => {
        const isTop = i < 2;
        const isLeft = i % 2 === 0;

        return (
          <Typography
            key={i}
            sx={{
              position: "absolute",
              [isLeft ? "left" : "right"]: center - maxRadius + 14,
              [isTop ? "top" : "bottom"]: center - maxRadius + 12,
              fontWeight: 700,
              color: "#111",
              textAlign: isLeft ? "left" : "right",
            }}
          >
            {label}
          </Typography>
        );
      })}

      {/* blips */}
      {publishedEntries.map((blip, idx) => {
        const q = Math.max(0, Math.min(3, blip.quadrant ?? 0));
        const r = Math.max(0, Math.min(rings - 1, blip.ring ?? rings - 1));
        const range = quadrantAngleRanges[q] || quadrantAngleRanges[0];

        const angle = range.start + Math.random() * (range.end - range.start);
        const innerRadius = (r / rings) * maxRadius;
        const outerRadius = ((r + 1) / rings) * maxRadius;
        const radiusVal =
          innerRadius + Math.random() * (outerRadius - innerRadius);

        const x = center + radiusVal * Math.cos(angle);
        const y = center + radiusVal * Math.sin(angle);

        return (
          <Tooltip key={blip._id || idx} title={blip.label} arrow>
            <Box
              sx={{
                position: "absolute",
                left: x - 8,
                top: y - 8,
                width: 16,
                height: 16,
                borderRadius: "50%",
                bgcolor: quadrantColors[q] || "primary.main",
                cursor: "pointer",
                border: "2px solid #fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            />
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default TechRadar;
