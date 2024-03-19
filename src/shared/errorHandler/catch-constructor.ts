import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';

export function catchConstructor(error: any) {
  switch (error.constructor) {
    case BadRequestException:
      throw new BadRequestException(error.message);
      break;
    case UnauthorizedException:
      throw new UnauthorizedException(error.message);
      break;
    case ForbiddenException:
      throw new ForbiddenException(error.message);
      break;
    case NotFoundException:
      throw new NotFoundException(error.message);
      break;
    case ConflictException:
      throw new ConflictException(error.message);
      break;
    case InternalServerErrorException:
      throw new InternalServerErrorException(error.message);
      break;
    case ServiceUnavailableException:
      throw new ServiceUnavailableException(error.message);
      break;
    default:
      switch (error.name) {
        case 'MongoServerError':
          throw new InternalServerErrorException(error.message);
          break;
        case 'ValidationError':
          throw new BadRequestException(error.message);
          break;
        default:
          throw new HttpException(
            {
              error: error.name,
              message: error.message,
              statusCode:
                error.response?.statusCode ||
                error.status ||
                HttpStatus.INTERNAL_SERVER_ERROR,
            },
            error.response?.statusCode ||
              error.status ||
              HttpStatus.INTERNAL_SERVER_ERROR,
          );
          break;
      }
      break;
  }
}
