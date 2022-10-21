import { model, Schema } from 'mongoose';
import { TaskModel } from '../Task';
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

ProjectSchema.post('findOneAndRemove', async (doc) => {
  await Promise.all([await TaskModel.deleteMany({ project: doc._id })]);
});

export const ProjectModel = model<Project.Item>('Project', ProjectSchema);
