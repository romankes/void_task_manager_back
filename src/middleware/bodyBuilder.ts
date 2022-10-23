import { BaseTypes } from '@/types';
import { NextFunction } from 'express';

type TField = {
  name: string;
  single: boolean;
};

export const bodyBuilder =
  (fields: TField[], wrapper: string) =>
  (
    req: BaseTypes.BaseRequest<{ [key: string]: {} }>,
    _: BaseTypes.BaseResponse,
    next: NextFunction,
  ) => {
    let body: { [key: string]: any } = {};

    const files = req.files as { [key: string]: Express.Multer.File[] };

    fields.forEach(({ name, single }) => {
      const file = files[name];

      if (file.length) {
        //TODO: refactor
        const newName = name
          .replace(new RegExp(`${wrapper}`, 'g'), '')
          .replace(/\[/g, '')
          .replace(/\]/g, '');

        body[newName] = single ? file[0] : file;
      }
    });

    req.body = {
      [wrapper]: {
        ...req.body[wrapper as keyof typeof req.body],
        ...body,
      },
    };

    next();
  };
