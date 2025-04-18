import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import type * as ms from 'ms';

const SECRET: Secret = process.env.JWT_SECRET || 'my_app_secret';

export function signJwt(payload: object, expiresIn : ms.StringValue = '7h'): string {
    const options: SignOptions = { expiresIn };
    return jwt.sign(payload, SECRET, options);
}
  
export function verifyJwt<T>(token: string): T | null {
  try {
    return jwt.verify(token, SECRET) as T;
  } catch {
    return null;
  }
}