import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";

const TechRadar = ({ entries }) => {
  const publishedEntries = entries.filter((e) => e.publishedAt);

  const size = 600;
  const center = size / 2;
  const maxRadius = size / 2 - 20; // padding so dots don’t spill out

  const rings = 4; // 0: Adopt (innermost) ... 3: Hold (outermost)
  const quadrantColors = ["#ff6b6b", "#4dabf7", "#51cf66", "#fcc419"];

  // Quadrant mapping (index -> corner):
  // 0 = top-left (Techniques)
  // 1 = top-right (Tools)
  // 2 = bottom-left (Platforms)
  // 3 = bottom-right (Languages)
  const quadrantAngleRanges = [
    { start: -Math.PI, end: -Math.PI / 2 }, // top-left
    { start: -Math.PI / 2, end: 0 }, // top-right
    { start: Math.PI / 2, end: Math.PI }, // bottom-left
    { start: 0, end: Math.PI / 2 }, // bottom-right
  ];

  const ringLabels = ["Adopt", "Trial", "Assess", "Hold"]; // inner -> outer
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

      {/* ring labels (top-center inside each ring band) */}
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
              top: yLabel - 10, // small nudge upward
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

      <Typography
        sx={{
          position: "absolute",
          left: center - maxRadius + 14,
          top: center - maxRadius + 12,
          fontWeight: 700,
          color: "#111",
        }}
      >
        {quadrantLabels[0]}
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          right: center - maxRadius + 14,
          top: center - maxRadius + 12,
          fontWeight: 700,
          color: "#111",
        }}
      >
        {quadrantLabels[1]}
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          left: center - maxRadius + 14,
          bottom: center - maxRadius + 12,
          fontWeight: 700,
          color: "#111",
        }}
      >
        {quadrantLabels[2]}
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          right: center - maxRadius + 14,
          bottom: center - maxRadius + 12,
          fontWeight: 700,
          color: "#111",
          textAlign: "right",
        }}
      >
        {quadrantLabels[3]}
      </Typography>

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
