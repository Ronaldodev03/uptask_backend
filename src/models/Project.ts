import mongoose, { Schema, Document, Types, PopulatedDoc } from "mongoose";
import { ITask } from "./Task";
import { IUser } from "./User";

// ProjectType extending Document will have Mongoose document properties (like _id, timestamps, etc.)
export interface IProject extends Document {
  projectName: string;
  clientName: string;
  description: string;
  tasks: PopulatedDoc<ITask & Document>[];
  manager: PopulatedDoc<IUser & Document>;
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
    manager: {
      type: Types.ObjectId,
      ref: "User", // <-- la referencia será el model de User
    },
  },
  { timestamps: true }
);

const Project = mongoose.model<IProject>("Project", ProjectSchema);
export default Project;
