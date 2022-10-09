import { CONFIG } from '@/configs';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

// Types
type TDecoded = string | JwtPayload | undefined;

export const sign = (data: JwtPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(
      data,
      CONFIG.TOKEN_SECRET,
      { expiresIn: CONFIG.TOKEN_EXPIRE },
      (err, token) => {
        err ? reject(err) : resolve(token || '');
      },
    );
  });
};

export const decode = (jwt: string): Promise<TDecoded> => {
  return new Promise((res, rej) => {
    jsonwebtoken.verify(jwt, CONFIG.TOKEN_SECRET, (err, decoded) => {
      return err ? rej(err) : res(decoded);
    });
  });
};
