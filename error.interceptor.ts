import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    HttpException,
    CallHandler,
    NotFoundException,
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  
  @Injectable()
  export class ErrorsInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        catchError((err) => {
          if (err instanceof HttpException) {
            console.log(err['status'], 'errrrrrrrrrrrrrrrr');
            if (err['status'] == 400) {
              throw new BadRequestException(err.message);
            } else if (err['status'] == 401) {
              throw new UnauthorizedException(err.message);
            } else if (err['status'] == 403) {
              throw new ForbiddenException(err.message);
            } else if (err['status'] == 500) {
              throw new InternalServerErrorException(err.message);
            }
            throw new NotFoundException(err.message);
          } else {
            console.log('------');
            throw err;
          }
        }),
      );
    }
  }
  