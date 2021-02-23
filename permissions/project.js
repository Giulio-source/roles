const { ROLE } = require("../data");

function canAccessProject(user, project) {
  return user.role == ROLE.ADMIN || user.id == project.userId;
}

function filteredProjects(user, projects) {
  if (user.role == ROLE.ADMIN) {
    return projects;
  }
  return projects.filter((project) => user.id === project.userId);
}

module.exports = { canAccessProject, filteredProjects };
