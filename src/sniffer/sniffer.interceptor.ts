import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs';
import { SnifferService } from './services/sniffer.service';

@Injectable()
export class SnifferInterceptor implements NestInterceptor {
  constructor(private readonly snifferService: SnifferService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const content = req.method === 'GET' ? 'query' : 'body';
    const body = req[content];

    const snifferData: any = {
      requestHeaders: req.headers,
      method: req.method,
      url: [req.url, req.baseUrl].join(''),
      ip: req.headers['client-ip'] || req.ip || 'unknown',
      request: body,
      statusCode: res.statusCode,
      date: new Date(),
      response: null,
      referer: req.headers['referer'],
      userAgent: req.headers['user-agent'],
    };
    return next.handle().pipe(
      tap(async (response) => {
        snifferData.response = response;
        snifferData.processingTime = Date.now() - now;

        await this.snifferService.create(snifferData);
      }),
      catchError((error) => {
        snifferData.statusCode =
          error instanceof HttpException && error.getStatus()
            ? error.getStatus()
            : 500;
        snifferData.response = error;
        snifferData.processingTime = Date.now() - now;

        this.snifferService.create(snifferData);

        return throwError(() => error);
      }),
    );
  }
}
