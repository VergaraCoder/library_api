import { forwardRef, Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { AuthorModule } from 'src/author/author.module';
import { Gender } from 'src/gender/entities/gender.entity';
import { GenderModule } from 'src/gender/gender.module';
import { AuthorService } from 'src/author/author.service';
import { GenderService } from 'src/gender/gender.service';
import { FilterBookService } from './filterQuery/book.filterQuery';

@Module({
  imports:[
    TypeOrmModule.forFeature([Book]),
    AuthorModule,
    forwardRef(()=>GenderModule)
  ],
  controllers: [BookController],
  providers: [BookService,AuthorService,GenderService,FilterBookService],
  exports:[TypeOrmModule]
})
export class BookModule {}
