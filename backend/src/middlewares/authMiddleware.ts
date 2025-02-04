import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

class AuthError extends Error {
  constructor(message: string, public statusCode = 401) {
    super(message);
    this.name = 'AuthError';
  }
}

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    response.status(401).json({
      status: 'error',
      message: 'Token não fornecido',
    });
    return;
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    response.status(401).json({
      status: 'error',
      message: 'Token mal formatado',
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const { id } = decoded as TokenPayload;

    request.userId = id;

    next();
  } catch (err) {
    response.status(401).json({
      status: 'error',
      message: 'Token inválido ou expirado',
    });
  }
}
