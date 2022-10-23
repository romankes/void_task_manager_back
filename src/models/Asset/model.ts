import { model, Schema } from 'mongoose';
import { Asset } from './namespace';

import { unlink } from 'fs/promises';
import path from 'path';

const AssetSchema = new Schema(
  {
    url: { type: String, required: 'Url is required' },
  },
  { timestamps: false },
);

AssetSchema.post('findOneAndRemove', async (doc) => {
  await unlink(path.join(__dirname, '../../..', doc.url));
});

export const AssetModel = model<Asset.Item>('Asset', AssetSchema);
