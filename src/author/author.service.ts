import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(@InjectRepository(Author) private authorRepository:Repository<Author>){}

  create(createAuthorDto: Partial<Author>) {
    try{
      const createAuthor=this.authorRepository.create(createAuthorDto);
      return this.authorRepository.save(createAuthor);
    }catch(err:any){
      
    }
  }

  findAll() {
    return `This action returns all author`;
  }

  findOne(id: any) {
    return {id:2}; // exmaple i must remove of here
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
