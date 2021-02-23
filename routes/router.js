const express = require("express");
const router = express.Router();
const { projects } = require("../data");
const { authUser } = require("../basicAuth");
const {
  canAccessProject,
  filteredProjects,
} = require("../permissions/project");

router.get("/", authUser, (req, res) => {
  res.json(filteredProjects(req.user, projects));
});

router.get("/:projectId", getProject, authUser, authGetProject, (req, res) => {
  res.json(req.project);
});

router.delete(
  "/:projectId",
  getProject,
  authUser,
  authGetProject,
  (req, res) => {
    delete projects[req.project.id];
    res.send("Project deleted");
  }
);

function getProject(req, res, next) {
  const projectId = parseInt(req.params.projectId);
  req.project = projects.find((project) => project.id === projectId);

  if (req.project == null) {
    res.status(404);
    return res.send("404 Project not found");
  }

  next();
}

function authGetProject(req, res, next) {
  if (!canAccessProject(req.user, req.project)) {
    res.status(401);
    return res.send("Not allowed");
  }
  next();
}

module.exports = router;
