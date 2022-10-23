import { Asset } from '@/models';
import { BaseTypes } from '@/types';
import path from 'path';

export class AssetController {
  private generatePath = (folder: string, file: string) => {
    return path.join(__dirname, '../../../uploads/', folder, file);
  };

  users = (
    req: BaseTypes.BaseRequest<{}, {}, Asset.ShowParams>,
    res: BaseTypes.BaseResponse,
  ) => {
    res.sendFile(this.generatePath('users', req.params.file));
  };
}
