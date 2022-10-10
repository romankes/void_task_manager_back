import { model, Schema } from 'mongoose';
import { Project } from './namespace';

//TODO: prior

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: 'Project title is required',
    },
    description: {
      type: String,
      required: 'Project title is required',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    maxHours: {
      type: Number,
      required: 'Max hours is required',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: 'User is required',
    },
  },
  { timestamps: true },
);

export const ProjectModel = model<Project.Item>('Project', ProjectSchema);
