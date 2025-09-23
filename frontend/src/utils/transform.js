const categoryToQuadrant = {
  Techniques: 0,
  Tools: 1,
  Platforms: 2,
  "Languages & Frameworks": 3,
};

const maturityToRing = {
  Adopt: 0,
  Trial: 1,
  Assess: 2,
  Hold: 3,
};

export function transformTechnologies(data) {
  return data
    .filter((tech) => tech.publishedAt) // Only include published technologies
    .map((tech) => ({
      _id: tech._id,
      label: tech.name,
      quadrant: categoryToQuadrant[tech.category] ?? 0,
      ring: maturityToRing[tech.maturity] ?? 3,
      moved: 0,
      description: tech.description || "",
      classification: tech.classification || "",
      publishedAt: tech.publishedAt,
    }));
}
