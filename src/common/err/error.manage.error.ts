import { HttpException, HttpStatus } from "@nestjs/common";

export class errorManage extends Error{
    constructor({type,message}:{type:keyof typeof HttpStatus,message:string}){
        super(`${type} :: ${message}`);
    }

    static errorSignature(message:any){
        const name=message.split(" :: ")[0];
        if(name){
            throw new HttpException(HttpStatus[name],message);
        }else{
            throw new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}