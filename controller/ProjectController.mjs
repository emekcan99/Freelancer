import fs from "fs";
import Project from "../models/Project.mjs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const postProject = async (req, res) => {
  let imgName = await req.files.sampleFile.name;
  let uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.sampleFile;
  let uploadPath = __dirname + "/../public/uploads/" + imgName;

  console.log(req.body);
  uploadeImage.mv(uploadPath, async () => {
    await Project.create({
      ...req.body,
      image: "/uploads/" + imgName,
    });
    res.redirect("/");
  });
};

export const getAllProject = async (req, res) => {
  let projects = await Project.find({}).sort("-dateCreated");

  res.render("index", {
    projects: projects,
  });
};

export const deleteAproject = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  let deletedImage = __dirname + "/../public" + project.image;

  fs.unlinkSync(deletedImage);

  await Project.findByIdAndRemove(req.params.id);

  res.redirect("/");
};

export const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  project.title = req.body.title;
  project.description = req.body.description;

  project.save();

  res.redirect("/");
};
