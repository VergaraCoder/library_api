import { forwardRef, Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [TypeOrmModule.forFeature([Gender]), forwardRef(() => BookModule)],
  controllers: [GenderController],
  providers: [GenderService],
  exports: [TypeOrmModule],
})
export class GenderModule {}
