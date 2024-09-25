import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { AuthorService } from 'src/author/author.service';
import { GenderService } from 'src/gender/gender.service';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private bookRepository:Repository<Book>, private authorService:AuthorService, private genderService:GenderService){}

  async create(createBookDto: CreateBookDto) {
    const returnAuthor=await this.authorService.findOne(createBookDto.author);
    const genders=await this.genderService.findOne(createBookDto.gender);

    const createBook=this.bookRepository.create({
      title:createBookDto.title,
      authorId:returnAuthor.id,
      publication_date:new Date(),
      gender:genders
    });
    await this.bookRepository.save(createBook);
    return createBook;
  }

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
