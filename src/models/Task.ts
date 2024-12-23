import mongoose, { Schema, Document, Types } from "mongoose";

// ProjectType extending Document will have Mongoose document properties (like _id, timestamps, etc.)
export interface ITask extends Document {
  name: string;
  description: string;
  project: Types.ObjectId;
}

export const TaskSchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    project: {
      type: Types.ObjectId,
      ref: "Project", // <-- la referencia será el model de Project
    },
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", TaskSchema);
export default Task;
