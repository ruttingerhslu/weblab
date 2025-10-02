import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import TechForm from "../components/TechForm";
import TechList from "../components/TechList";
import { deleteTechnology, getTechnologies } from "../api/technology";

export default function Admin() {
  const [technologies, setTechnologies] = useState([]);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);

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

  const handleDelete = (tech) => {
    setSelectedTech(tech);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedTech) return;
    const token = localStorage.getItem("token");
    try {
      await deleteTechnology(token, selectedTech._id);
      await fetchTechnologies();
    } catch (err) {
      console.error("Failed to delete technology", err);
    } finally {
      setDeleteOpen(false);
      setSelectedTech(null);
    }
  };

  const cancelDelete = () => {
    setDeleteOpen(false);
    setSelectedTech(null);
  };

  const published = technologies.filter((t) => t.publishedAt);
  const unpublished = technologies.filter((t) => !t.publishedAt);

  return (
    <div>
      <Box sx={{ p: 4 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>

          <Button variant="contained" sx={{ mb: 3 }} onClick={handleNew}>
            New Technology
          </Button>
        </Stack>

        <Typography variant="h6">Unpublished Technologies</Typography>
        <TechList
          technologies={unpublished}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6">Published Technologies</Typography>
        <TechList
          technologies={published}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <TechForm
            initialData={editing}
            title={editing ? "Edit Technology" : "Add New Technology"}
            onSuccess={handleFormSuccess}
          />
        </Dialog>

        <Dialog
          open={deleteOpen}
          onClose={cancelDelete}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Delete Technology</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete{" "}
              <strong>{selectedTech?.name}</strong>? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete} color="inherit">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}
