import { forwardRef, Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { FilterAuthorService } from './filterService/filter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Author]),
    forwardRef(()=>AuthorModule)
  ],
  controllers: [AuthorController],
  providers: [AuthorService,FilterAuthorService],
  exports: [TypeOrmModule],
})
export class AuthorModule {}
