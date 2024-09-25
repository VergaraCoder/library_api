import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import path from "path";



@Catch()
export class HttpFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const request= host.switchToHttp().getRequest();
        const response=host.switchToHttp().getResponse();

        const ifExist=exception.message.split(" :: ")[1];
        let message:any= "";
        let status:number= 0;

        switch(exception.message.split(" :: ")){
            case ifExist:
                message=ifExist;
                status=exception.message.split(" :: ")[0];
                break;
            case null:
                message="Bad Request";
                status= 400;
                break;
            default:
                message=HttpStatus.INTERNAL_SERVER_ERROR;
                status=500;
        }

        response.status(status).json({
            status:status,
            method:request.method,
            timestamps:new Date(),
            path:request.url,
            message:message
        });
    }
}