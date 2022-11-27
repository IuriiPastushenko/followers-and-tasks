import { HttpException } from './httpexception';
import { NextFunction, Request, Response } from 'express';

export function errorMiddleware(
  err: Error | HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof HttpException) {
    const contentError = err.contentError;
    console.log(`Error ${err.statusCode}: ${contentError}\n${err}`);
    res.status(err.statusCode).json({
      'error cod': `${err.statusCode}`,
      'error description': `${err.contentError}`,
      'error from app': err,
    });
  } else {
    console.log(` Error 500: ${err.message}`);
    res.status(500).send({ error: err.message });
  }
}
