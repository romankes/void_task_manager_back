import { model, Schema, Types } from 'mongoose';
import { Task } from './namespace';

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: 'Title is required',
    },
    description: {
      type: String,
      required: 'Description is required',
    },
    date: {
      type: Date,
      required: 'Date is required',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 0,
    },
    user: {
      ref: 'User',
      type: Types.ObjectId,
      required: 'User is required',
    },
    project: {
      ref: 'Project',
      type: Types.ObjectId,
      required: 'Project is required',
    },
  },
  { timestamps: true },
);

export const TaskModel = model<Task.Item>('Task', TaskSchema);
