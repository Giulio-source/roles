const express = require("express");
const app = express();
const routerProjects = require("./routes/router");
const { ROLE, users } = require("./data");
const { authUser, authRole } = require("./basicAuth");

app.use(express.json());
app.use(setUser);
app.use("/projects", routerProjects);

app.get("/", (req, res) => {
  res.send("Home");
});
app.get("/dashboard", authUser, (req, res) => {
  res.json(req.user);
});
app.get("/admin", authUser, authRole(ROLE.ADMIN), (req, res) => {
  res.json(req.user);
});

function setUser(req, res, next) {
  const userId = req.body.userId;
  if (userId) {
    req.user = users.find((user) => user.id === userId);
  }
  next();
}

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
