/**
 * Centrální utilita pro zpracování chyb v aplikaci
 */

export type ErrorResponse = {
  message: string;
  code?: string;
  redirectPath?: string;
};

export class AppError extends Error {
  code?: string;
  redirectPath?: string;

  constructor(message: string, code?: string, redirectPath?: string) {
    super(message);
    this.code = code;
    this.redirectPath = redirectPath;
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown): ErrorResponse => {
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
      redirectPath: error.redirectPath,
    };
  }

  console.error('Unexpected error:', error);
  return {
    message: 'Došlo k neočekávané chybě.',
    code: 'UNKNOWN_ERROR',
  };
}; 