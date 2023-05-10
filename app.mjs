import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import {
  deleteAproject,
  getAllProject,
  postProject,
  updateProject,
} from "./controller/projectController.mjs";
import methodOverride from "method-override";
import Project from "./models/Project.mjs";

const app = express();
const port = 3000;

//view engine
app.set("view engine", "ejs");

// mongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/freelancer")
  .then(() => console.log("mongoDB connection is succesful"));

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//routes
app.get("/", getAllProject);
app.get("/add", (req, res) => {
  res.render("add");
});
app.get("/:id", async (req, res) => {
  let project = await Project.findById(req.params.id);
  res.render("update", {
    project: project,
  });
});
app.post("/add", postProject);
app.delete("/:id", deleteAproject);
app.put("/:id", updateProject);

app.listen(port, () => {
  console.log(`server is up on port:${port}`);
});
