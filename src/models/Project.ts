import mongoose, { Schema, Document } from "mongoose";

// ProjectType extending Document will have Mongoose document properties (like _id, timestamps, etc.)
export type ProjectType = Document & {
  projectName: string;
  clientName: string;
  description: string;
};

const ProjectSchema: Schema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model<ProjectType>("Project", ProjectSchema);
export default Project;