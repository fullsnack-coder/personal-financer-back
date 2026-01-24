import type { AuthUser } from './auth.guard';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
