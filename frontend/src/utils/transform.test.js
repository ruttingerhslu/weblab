import { transformTechnologies } from "./transform";

describe("transformTechnologies", () => {
  it("maps all fields correctly for a valid technology", () => {
    const input = [
      {
        _id: "1",
        name: "React",
        category: "Languages & Frameworks",
        maturity: "Adopt",
        description: "A JS library",
        classification: "Established and well documented",
        publishedAt: "2025-01-01",
      },
    ];

    const result = transformTechnologies(input);

    expect(result).toEqual([
      {
        _id: "1",
        label: "React",
        quadrant: 3,
        ring: 0,
        moved: 0,
        description: "A JS library",
        classification: "Established and well documented",
        publishedAt: "2025-01-01",
      },
    ]);
  });

  it("uses default quadrant 0 for unknown category", () => {
    const input = [
      {
        _id: "2",
        name: "UnknownTech",
        category: "SomethingElse",
        maturity: "Trial",
        publishedAt: "2025-02-01",
      },
    ];

    const result = transformTechnologies(input);

    expect(result[0].quadrant).toBe(0);
    expect(result[0].ring).toBe(1);
  });

  it("uses default ring 3 for unknown maturity", () => {
    const input = [
      {
        _id: "3",
        name: "TestTech",
        category: "Tools",
        maturity: "Hold",
        publishedAt: "2025-03-01",
      },
    ];

    const result = transformTechnologies(input);

    expect(result[0].quadrant).toBe(1);
    expect(result[0].ring).toBe(3);
  });

  it("fills missing optional fields with defaults", () => {
    const input = [
      {
        _id: "4",
        name: "MinimalTech",
        category: "Platforms",
        maturity: "Assess",
        publishedAt: "2025-04-01",
      },
    ];

    const result = transformTechnologies(input);

    expect(result[0].description).toBe(""); // default
    expect(result[0].classification).toBe(""); // default
  });

  it("handles multiple technologies", () => {
    const input = [
      { _id: "a", name: "Docker", category: "Platforms", maturity: "Adopt" },
      {
        _id: "b",
        name: "Rust",
        category: "Languages & Frameworks",
        maturity: "Trial",
      },
    ];

    const result = transformTechnologies(input);

    expect(result).toHaveLength(2);
    expect(result[0].quadrant).toBe(2);
    expect(result[0].ring).toBe(0);
    expect(result[1].quadrant).toBe(3);
    expect(result[1].ring).toBe(1);
  });
});
