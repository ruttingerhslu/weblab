import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Stack,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Navbar from "../components/Navbar";
import TechForm from "../components/TechForm";
import { getTechnologies } from "../api/technology";

export default function Admin() {
  const [technologies, setTechnologies] = useState([]);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchTechnologies = async () => {
    const token = localStorage.getItem("token");
    try {
      const data = await getTechnologies(token);
      setTechnologies(data);
    } catch (err) {
      console.error("Failed to load technologies", err);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const handleNew = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (tech) => {
    setEditing(tech);
    setOpen(true);
  };

  const handleClose = () => {
    setEditing(null);
    setOpen(false);
  };

  const handleFormSuccess = () => {
    handleClose();
    fetchTechnologies();
  };

  const published = technologies.filter((t) => t.published);
  const unpublished = technologies.filter((t) => !t.published);

  return (
    <div>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>

        <Button variant="contained" sx={{ mb: 3 }} onClick={handleNew}>
          New Technology
        </Button>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6">Unpublished Technologies</Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {unpublished.map((tech) => (
            <Card key={tech._id}>
              <CardContent>
                <Typography variant="subtitle1">{tech.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {tech.description}
                </Typography>
                <Button size="small" onClick={() => handleEdit(tech)}>
                  Edit
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6">Published Technologies</Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {published.map((tech) => (
            <Card key={tech._id}>
              <CardContent>
                <Typography variant="subtitle1">{tech.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {tech.description}
                </Typography>
                <Button size="small" onClick={() => handleEdit(tech)}>
                  Edit
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Add/Edit modal */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>
            {editing ? "Edit Technology" : "Add New Technology"}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TechForm
              initialData={editing}
              title={editing ? "Edit Technology" : "Add New Technology"}
              onSuccess={handleFormSuccess}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </div>
  );
}
