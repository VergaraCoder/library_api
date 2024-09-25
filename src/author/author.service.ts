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

  async findAll() {
    return await this.authorRepository.find();
  }

  async findOne(name: string) {
    const dataAuthor=await this.authorRepository.findOne({where:{name:name}})// exmaple i must remove of here
    return dataAuthor;
  }


    async findOne2(id:number) {
    const dataAuthor=await this.authorRepository.findOne({where:{id:id}})// exmaple i must remove of here
    return dataAuthor;
  }


  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }



}
