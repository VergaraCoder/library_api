import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { AuthorService } from 'src/author/author.service';
import { GenderService } from 'src/gender/gender.service';
import { query } from 'express';
import { BookRepo } from './repo';
import { FilterBookService } from './filterQuery/book.filterQuery';
import { BookModule } from './book.module';


import {getRepositoryToken} from '@nestjs/typeorm';

describe('BookService', () => {
  let service: BookService;

  const querys={
      date: new Date(),
      title: "viuda",
      page: 2,
      limit:2,
      gender: "comedia",
      sort: "ASC",
      author: "pedro",
      authorId: 1,
  };

  const mockupResponse=
    {
      id: '179e5620-28aa-4cee-85b4-76e487b8f725',
      title: "viuda",
      publication_date: new Date(),
      authorId: 1,
      author: { id: 1, name: "John Doe", age: 45, publishedBooks: 3, book: [] },
      gender: [{ id: 1, name_gender: "comedia",books:[] }]
    }
  ;



  const mockupBookRepository={
    create:jest.fn().mockResolvedValue(mockupResponse),
    findAll:jest.fn().mockResolvedValue([
      mockupResponse
    ]),
    findOne:jest.fn().mockResolvedValue(mockupResponse),
    update:jest.fn().mockResolvedValue(mockupResponse),
    delete:jest.fn().mockResolvedValue(mockupResponse),
  }


  
const mockerAuthorService={
  findOne:jest.fn().mockResolvedValue({
     id: 1, name: "John Doe", age: 45, publishedBooks: 3, book: [] 
  })
}

const mockerGenderService={
  findOne:jest.fn().mockResolvedValue([
    {
      id:1,
      name_gender:"comedia"
    }
  ])
}


const mockerFilterBookService={
  resultData:jest.fn().mockResolvedValue([mockupResponse])
}



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
         provide: getRepositoryToken(Book), useValue:mockupBookRepository
        },

        {provide:AuthorService,useValue:mockerAuthorService},

        {provide:GenderService , useValue:mockerGenderService},

        {provide:FilterBookService, useValue:mockerFilterBookService}
      ],
    })
    .compile();


    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('shoulkd return this object',async ()=>{
    const response=await service.findOne(mockupResponse.id);
    expect(response).toBe(mockupResponse);
  })

  it('melo',async()=>{
    const response=await service.findAll(querys);
    expect(response).toEqual([mockupResponse]);
  })

  it('melo',async()=>{
    const response=await service.update(mockupResponse.id,{
      title:mockupResponse.title,
      authorId:2
    });
    expect(response).toEqual(mockupResponse);
  })

  it('melo',async()=>{
    const response=await service.remove(mockupResponse.id);
    expect(response).toEqual(mockupResponse);
  })

});
