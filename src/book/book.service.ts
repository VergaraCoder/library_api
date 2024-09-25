import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { AuthorService } from 'src/author/author.service';
import { GenderService } from 'src/gender/gender.service';
import { errorManage } from 'src/common/err/error.manage.error';

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

  async findAll() {
    try{
      const data= await this.bookRepository.find();
      if(!data){
        throw new errorManage({
          type:"NOT_FOUND",
          message:"Resgisters not found"
        });
      }
      return data;
    }catch(err:any){
      throw errorManage.errorSignature(err.message);
    }
  }

  async findOne(id: string) {
    try{
      const returnOneBook=await this.bookRepository.findOne({where:{id:id}});
      if(!returnOneBook){
        throw new errorManage({
          type:"NOT_FOUND",
          message:"Incorret Credenctials"
        });
      }
    return returnOneBook;
    }catch(err:any){
      throw errorManage.errorSignature(err.message);
    }
  }

  async update(id: string, updateBookDto: Partial<Book>) {
    try{
      const dataReturn=await this.findOne(id);
      const updateLog=await this.bookRepository.update(dataReturn.id,updateBookDto);
      return updateLog;
    }catch(err:any){
      throw errorManage.errorSignature(err.message);
    }
  }

  async remove(id: string) {
    const dataDelete=await this.bookRepository.delete({id:id});
    return dataDelete;
  }
}
