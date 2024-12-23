import mongoose, { Schema, Document, Types, PopulatedDoc } from "mongoose";
import { ITask } from "./Task";

// ProjectType extending Document will have Mongoose document properties (like _id, timestamps, etc.)
export interface IProject extends Document {
  projectName: string;
  clientName: string;
  description: string;
  tasks: PopulatedDoc<ITask & Document>[];
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
    tasks: [
      {
        type: Types.ObjectId,
        ref: "Task", // <-- la referencia será el model de Task
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model<IProject>("Project", ProjectSchema);
export default Project;
