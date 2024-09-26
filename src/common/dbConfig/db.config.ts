import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmDataSourceFactory, TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";


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
            entities:[],
            synchronize:true
        }
    }
}