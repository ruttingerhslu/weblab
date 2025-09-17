import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

const Admin = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    classification: "",
    maturity: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/technologies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to add technology");
      const data = await res.json();
      console.log("✅ Added:", data);
      alert("Technology added successfully!");
      setFormData({
        name: "",
        category: "",
        maturity: "",
        description: "",
        classification: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding technology.");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Card sx={{ maxWidth: 600, mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add New Technology
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
              <TextField
                label="Maturity"
                name="maturity"
                value={formData.maturity}
                onChange={handleChange}
                required
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                multiline
                rows={4}
              />
              <TextField
                label="Classification"
                name="classification"
                value={formData.classification}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />

              <Button variant="contained" type="submit">
                Add Technology
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Admin;
