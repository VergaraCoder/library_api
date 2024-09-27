import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import path from 'path';

@Catch()
export class HttpFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest();
    const response = host.switchToHttp().getResponse();
    const ifExist = exception.message.split(' :: ');
    let message: any = '';
    let status: any = 0;

        if(exception.response.message){
            message="the properties are bad";
            status=400;
        }
        else if(ifExist){
            message=ifExist[1];
            status=HttpStatus[exception.message.split(" :: ")[0]];
        }
        else{
            message="INTERNAL SERVER ERROR";
            status=500;
        }

    response.status(status).json({
      status: status,
      method: request.method,
      timestamps: new Date(),
      path: request.url,
      message: message,
    });
  }
}
