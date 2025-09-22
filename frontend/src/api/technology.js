export async function addTechnology(token, data) {
  const res = await fetch("http://localhost:8080/technologies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add technology");
  return res.json();
}

export async function updateTechnology(token, id, data) {
  const res = await fetch(`http://localhost:8080/technologies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update technology");
  return res.json();
}

export async function getTechnologies(token) {
  const res = await fetch("http://localhost:8080/technologies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch technologies");
  return res.json();
}
