import {
  Typography,
  IconButton,
  Stack,
  Card,
  CardContent,
  Box,
} from "@mui/material";

import { DeleteIcon, EditIcon } from "@mui/icons-material";

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
                <IconButton size="small" onClick={() => handleEdit(tech)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(tech)}>
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
