import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    userId: string;
  }
}

export interface AuthenticatedRequest extends Request {
  userId: string;
}
