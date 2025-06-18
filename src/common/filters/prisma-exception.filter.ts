import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

@Catch()
export class PrismaExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let httpStatus: number;
    let message: string;

    if (exception instanceof PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          httpStatus = HttpStatus.CONFLICT;
          message = 'Unique constraint violation';
          break;
        case 'P2025':
          httpStatus = HttpStatus.NOT_FOUND;
          message = 'Record not found';
          break;
        default:
          httpStatus = HttpStatus.BAD_REQUEST;
          message = exception.message;
      }
    } else if (exception instanceof PrismaClientUnknownRequestError) {
      httpStatus = HttpStatus.BAD_REQUEST;
      message = 'Unknown database error';
    } else if (exception instanceof PrismaClientRustPanicError) {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Database engine error';
    } else if (exception instanceof PrismaClientInitializationError) {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Database connection error';
    } else if (exception instanceof PrismaClientValidationError) {
      httpStatus = HttpStatus.BAD_REQUEST;
      message = 'Invalid data provided';
    } else if (exception instanceof Error) {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message || 'Internal server error';
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Unknown error occurred';
    }

    const responseBody = {
      statusCode: httpStatus,
      message,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()) as string,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
