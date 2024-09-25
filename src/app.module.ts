import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { GenderModule } from './gender/gender.module';
import { AuthorModule } from './author/author.module';


@Module({
  imports: [BookModule, GenderModule, AuthorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
