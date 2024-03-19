import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger(this.constructor.name);
  }
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    if (response.headersSent) {
      // Si la respuesta ya se ha enviado, no hacemos nada en el filtro
      return;
    }

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()?.['message']
          ? exception.getResponse()?.['message']
          : exception['message']
        : 'Internal server error';

    const devErrorResponse: any = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      errorName: exception?.name,
      message,
    };

    this.logger.log(
      `request method: ${request.method} request url${
        request.url
      } ${JSON.stringify(devErrorResponse)}`,
    );
    return response.status(statusCode).json(devErrorResponse);
  }
}
