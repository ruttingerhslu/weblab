import {
  Typography,
  IconButton,
  Stack,
  Card,
  CardContent,
  Box,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function TechList({ technologies, handleEdit, handleDelete }) {
  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      {technologies.map((tech) => (
        <Card key={tech._id}>
          <CardContent>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle1">{tech.name}</Typography>
              <Box>
                <IconButton
                  size="small"
                  onClick={() => handleEdit(tech)}
                  aria-label={`edit ${tech.name}`}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(tech)}
                  aria-label={`delete ${tech.name}`}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
