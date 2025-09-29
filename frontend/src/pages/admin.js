import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";

import Navbar from "../components/Navbar";
import TechForm from "../components/TechForm";
import TechList from "../components/TechList";
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

  const published = technologies.filter((t) => (t.publishedAt ? true : false));
  const unpublished = technologies.filter((t) =>
    t.publishedAt ? false : true,
  );

  return (
    <div>
      <Navbar />
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
        <TechList technologies={unpublished} handleEdit={handleEdit}></TechList>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6">Published Technologies</Typography>
        <TechList technologies={published} handleEdit={handleEdit}></TechList>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <TechForm
            initialData={editing}
            title={editing ? "Edit Technology" : "Add New Technology"}
            onSuccess={handleFormSuccess}
          />
        </Dialog>
      </Box>
    </div>
  );
}
