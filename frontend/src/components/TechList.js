import { Typography, Button, Stack, Card, CardContent } from "@mui/material";

export default function TechList({ technologies, handleEdit }) {
  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      {technologies.map((tech) => (
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
  );
}
