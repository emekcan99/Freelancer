import mongoose from "mongoose";

const Schema = mongoose.Schema;

//creating a schema

const projectSchema = new Schema({
  title: String,
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
