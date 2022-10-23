import { Router } from 'express';

import { AssetController } from '@/controllers';

const controller = new AssetController();

const assetRoutes = Router();

assetRoutes.get('/users/:file', controller.users);

export { assetRoutes };
