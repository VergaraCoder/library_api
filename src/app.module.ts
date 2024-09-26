import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { GenderModule } from './gender/gender.module';
import { AuthorModule } from './author/author.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmCredentials } from './common/dbConfig/db.config';


@Module({
  imports: [BookModule, GenderModule, AuthorModule,
    ConfigModule.forRoot(
      {
        isGlobal:true,
        envFilePath:".env"
      }
    ),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useClass:typeOrmCredentials
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
