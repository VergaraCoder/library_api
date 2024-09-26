import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import path from "path";



@Catch()
export class HttpFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const request= host.switchToHttp().getRequest();
        const response=host.switchToHttp().getResponse();

        console.log(exception.message);
        
        
        const ifExist=exception.message.split(" :: ");
        let message:any= "";
        let status:any= 0;
        console.log(ifExist);
        
        
        if(ifExist[1]){          
            switch(ifExist){
                case ifExist:            
                    message=ifExist[1] ? ifExist[1] :"BadRequest" ;
                    status=ifExist[0] ? HttpStatus[ifExist[0]] : 400;
                    break;
                case null:
                    message="Bad Request";
                    status= 400;
                    break;
                default:
                    message="INTERNAL SERVER ERROR";
                    status=500;
            }
        }else if(exception.response.message){           
            message=exception.response.message;
            status=exception.response.statusCode;
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