# Technology Radar architecture

This document provides the software architecture documentation of the project including decisions, diagrams and specification.

# 1. Introduction

The context and requirements for this project are provided [here](https://github.com/web-programming-lab/web-programming-lab-projekt/blob/main/Technologie-Radar.md).

# 2. Architecture constraints

Due to the limited scope of this project, no further constraints are detailed here. 

# 3. System context and scope


## 3.1 System context diagram
The following diagram shows the system from the business side of things.

```mermaid
C4Context
title System Context diagram for Technology Radar

Person(employeeA, "Employee")
Person(adminA, "CTO or Tech Lead")

System(systemA, "Technology Radar")

Rel(employeeA, systemA, "Can view technology radar")
Rel(adminA, systemA, "Can view and manage technology radar")

UpdateRelStyle(employeeA, systemA, $offsetX="-100")


UpdateLayoutConfig($c4ShapeInRow="2")
```

## 3.2 Container diagram
Zooming into the Technology Radar above, we get the following diagram:

```mermaid
C4Container
title Container diagram for Technology Radar

Person(employeeA, "Employee")
Person(adminA, "CTO or Tech Lead")

Boundary(c1, "Technology Radar") {
    Boundary(c2, "Frontend") {
        Container(c_react, "React", "Frontend application")
    }
    Boundary(c3, "Backend") {
        Container(c_express, "Express", "Backend API")
        Container(c_mongoose, "Mongoose", "MongoDB ORM")
        ContainerDb(database, "Database", "MongoDB", "Stores users, technologies, logs, etc.")
    }
}

Rel(employeeA, c_react, "Can view technology radar")
Rel(adminA, c_react, "Can view and manage technology radar")

Rel(c_react, c_express, "Calls API", "JSON/REST")

Rel(c_express, c_mongoose, "Reads/Writes")
Rel(c_mongoose, database, "Reads/Writes")

UpdateRelStyle(employeeA, c_react, $offsetX="-100", $offsetY="-75")
UpdateRelStyle(adminA, c_react, $offsetX="0", $offsetY="-75")
```

# 4. Solution Strategy

# 5. Building Block View

# 6. Runtime View

# 7. Deployment View

# 8. Concepts

# 9. Architecture Decisions

> Template: [adr-template-minimal.md](https://raw.githubusercontent.com/adr/madr/refs/heads/develop/template/adr-template-minimal.md)

The following [Architecture Decision Records (ADR's)](https://adr.github.io/) were made:

1. [MERN Techstack](./decisions/01-techstack.md)

# 10. Quality scenarios


