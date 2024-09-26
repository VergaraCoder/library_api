import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmDataSourceFactory, TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Author } from "src/author/entities/author.entity";
import { Book } from "src/book/entities/book.entity";
import { Gender } from "src/gender/entities/gender.entity";


@Injectable()
export class typeOrmCredentials implements TypeOrmOptionsFactory{
    constructor(private configService:ConfigService){}

    createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return{
            type:"mysql",
            host:this.configService.get<string>("DB_HOST"),
            port:+this.configService.get<string>("DB_PORT"),
            password:this.configService.get<string>("DB_PASSWORD"),
            username:this.configService.get<string>("DB_USERNAME"),
            database:this.configService.get<string>("DB_DATABASE"),
            entities:[Author,Gender,Book],
            synchronize:true
        }
    }
}