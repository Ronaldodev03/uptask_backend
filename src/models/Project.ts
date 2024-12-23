import mongoose, { Schema, Document } from "mongoose";

// ProjectType extending Document will have Mongoose document properties (like _id, timestamps, etc.)
export interface IProject extends Document {
  projectName: string;
  clientName: string;
  description: string;
}

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

const Project = mongoose.model<IProject>("Project", ProjectSchema);
export default Project;
