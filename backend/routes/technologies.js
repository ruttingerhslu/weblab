import express from "express";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

// Mock database
const technologies = [
  {
    name: "ArgoCD",
    category: "Tools",
    maturity: "Trial",
    desc: "Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes.",
    class:
      "Without making a judgment of the GitOps technique, we'd like to talk about Argo CD within the scope of deploying and monitoring applications in Kubernetes environments. Based on its ability to automate the deployment of the desired application state in the specified target environments in Kubernetes and our good experience with troubleshooting failed deployments, verifying logs and monitoring deployment status, we recommend you give Argo CD a try. You can even see graphically what is going on in the cluster, how a change is propagated and how pods are created and destroyed in real time.",
    date: new Date(0),
  },
];

router.post("/", (req, res) => {
  const technology = req.body;

  technologies.push({ ...technology, id: uuidv4() });

  res.send(`${technology.name} has been added to the Database`);
});

// Getting the list of technologies from the mock database
router.get("/", (req, res) => {
  res.send(technologies);
});

export default router;
