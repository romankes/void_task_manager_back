import { Asset, AssetModel } from '@/models';

export const assetService = new (class AssetService {
  create = async ({
    filename,
    folder,
  }: Asset.CreatePayload): Promise<Asset.Item | null> => {
    const url = `/uploads/${folder}/${filename}`;

    const doc = await AssetModel.create({ url });

    if (!doc) throw new Error('Asset did not create');

    return doc;
  };

  remove = async ({ id }: Asset.RemovePayload): Promise<Asset.Item | null> => {
    const doc = await AssetModel.findOneAndRemove({ _id: id });

    if (!doc) throw new Error('Asset did not update');

    return doc;
  };
})();
