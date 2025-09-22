import { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";
import { addTechnology, updateTechnology } from "../api/technology";

export default function TechForm({ initialData = null, onSuccess, title }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      description: "",
      classification: "",
      maturity: "",
      category: "",
      publish: false,
    },
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handlePublishChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      publish: e.target.checked,
    }));
  };

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
      if (formData._id) {
        // update existing
        await updateTechnology(token, formData._id, formData);
      } else {
        // create new
        await addTechnology(token, formData);
      }

      alert("✅ Saved successfully!");
      setFormData({
        name: "",
        description: "",
        classification: "",
        maturity: "",
        category: "",
        publish: false,
      });

      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Error saving technology.");
    }
  };

  return (
    <Card sx={{ maxWidth: 600, mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
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
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {[
                "Techniques",
                "Tools",
                "Platforms",
                "Languages & Frameworks",
              ].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Maturity"
              name="maturity"
              value={formData.maturity}
              onChange={handleChange}
              required={formData.publish} // only required if set to publish
            >
              {["Assess", "Trial", "Adopt", "Hold"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
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
              required={formData.publish} // only required if set to publish
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.publish}
                  onChange={handlePublishChange}
                />
              }
              label="Publish technology"
            />
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
