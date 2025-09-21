import { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { addTechnology } from "../api/technology";

export default function TechForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    classification: "",
    maturity: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const data = await addTechnology(token, formData);
      console.log("✅ Added:", data);
      alert("Technology added successfully!");
      setFormData({
        name: "",
        description: "",
        classification: "",
        maturity: "",
        category: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding technology.");
    }
  };
  return (
    <Card sx={{ maxWidth: 600, mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Add New Technology
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ flexWrap: "wrap" }}>
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
            <FormControlLabel
              control={<Checkbox />}
              label="Publish technology"
            />
            <Button variant="contained" type="submit">
              Add Technology
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
