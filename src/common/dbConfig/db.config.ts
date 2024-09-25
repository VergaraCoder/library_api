import { Injectable } from "@nestjs/common";
import { TypeOrmDataSourceFactory, TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";


@Injectable()
export class typeOrmCredentials implements TypeOrmOptionsFactory{
    createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return{
            type:"mysql",
        }
    }
}