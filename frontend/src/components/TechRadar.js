import React, { useState, useEffect } from "react";
import { Box, Popover, Tooltip, Typography } from "@mui/material";

const TechRadar = ({ entries }) => {
  const [selectedBlip, setSelectedBlip] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [size, setSize] = useState(600);

  useEffect(() => {
    const handleResize = () => {
      const newSize = Math.min(window.innerWidth - 40, 600); // responsive up to 600px
      setSize(Math.max(300, newSize)); // clamp between 300 and 600
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const quadrantCounts = [0, 0, 0, 0];
  entries.forEach((blip) => {
    const q = Math.max(0, Math.min(3, blip.quadrant ?? 0));
    quadrantCounts[q]++;
  });
  const quadrantIndices = [0, 0, 0, 0];

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
              fontSize: size < 400 ? "0.65rem" : "0.8rem",
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
              [isLeft ? "left" : "right"]: center - maxRadius * 1.05,
              [isTop ? "top" : "bottom"]: center - maxRadius * 1.05,
              fontWeight: 700,
              color: "#111",
              textAlign: isLeft ? "left" : "right",
              fontSize: size < 400 ? "0.65rem" : "0.8rem",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </Typography>
        );
      })}

      {/* blips */}
      {entries.map((blip, idx) => {
        const q = Math.max(0, Math.min(3, blip.quadrant ?? 0));
        const r = Math.max(0, Math.min(rings - 1, blip.ring ?? rings - 1));
        const range = quadrantAngleRanges[q] || quadrantAngleRanges[0];

        const total = quadrantCounts[q];
        const index = quadrantIndices[q]++; // index of this blip in quadrant
        const angleStep = (range.end - range.start) / (total + 1);
        const angle = range.start + angleStep * (index + 1);

        const innerRadius = (r / rings) * maxRadius;
        const outerRadius = ((r + 1) / rings) * maxRadius;
        const radius = (innerRadius + outerRadius) / 2; // middle of the band

        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);

        return (
          <Tooltip key={blip._id || idx} title={blip.label} arrow>
            <Box
              component="button"
              onClick={(e) => {
                setSelectedBlip(blip);
                setAnchorEl(e.currentTarget);
              }}
              aria-label={`More info about ${blip.label}`}
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
      {/* Popover */}
      <Popover
        open={Boolean(selectedBlip)}
        anchorEl={anchorEl}
        onClose={() => setSelectedBlip(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {selectedBlip && (
          <Box sx={{ p: 2, maxWidth: 350 }}>
            <Typography variant="h6">{selectedBlip.label}</Typography>

            {selectedBlip.description && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Description:</strong> {selectedBlip.description}
              </Typography>
            )}

            {selectedBlip.classification && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Classification:</strong> {selectedBlip.classification}
              </Typography>
            )}

            {selectedBlip.publishedAt && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Published:</strong>{" "}
                {new Date(selectedBlip.publishedAt).toLocaleDateString()}
              </Typography>
            )}

            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Quadrant:</strong> {selectedBlip.quadrant}
            </Typography>

            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Ring:</strong> {selectedBlip.ring}
            </Typography>
          </Box>
        )}
      </Popover>
    </Box>
  );
};

export default TechRadar;
