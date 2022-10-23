import { Router } from 'express';

// import {validate} from '@/helpers';

import { UserController } from '@/controllers';
import { UserServices } from '@/services';

import multer from 'multer';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';

import path from 'path';
import { bodyBuilder } from '@/middleware';

const controller = new UserController(new UserServices(), 'user');

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const directory = path.join(__dirname, '../../uploads/users');

    if (existsSync(directory)) {
      await mkdir(directory, { recursive: true });
    }

    cb(null, directory);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname.replace(/\s/g, '')}`);
  },
});

const upload = multer({ storage });

const userRoutes = Router();

userRoutes.get('/current', controller.current);

userRoutes.patch(
  '/current',
  upload.fields([{ name: 'user[avatar]', maxCount: 1 }]),
  bodyBuilder([{ name: 'user[avatar]', single: true }], 'user'),
  controller.update,
);
userRoutes.delete('/current', controller.remove);

export { userRoutes };
