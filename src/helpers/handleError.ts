import { BaseTypes } from '@/types';

type TErrorTypes =
  | 'not_found'
  | 'bad_params'
  | 'missing_params'
  | 'internal_error';

export const handleError = (res: BaseTypes.BaseResponse, type: TErrorTypes) => {
  res.status(400).send({ type });
};
