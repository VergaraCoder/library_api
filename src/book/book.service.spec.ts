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
  let bookRepository: Repository<Book>;
  let authorService: AuthorService;
  let genderService: GenderService;

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

  const mockupResponseFindAll=[
    {
      id:'179e5620-28aa-4cee-85b4-76e487b8f725',
      title:"viuda",
      publication_date:new Date(),
      authorId:1,
      gender:[
        {
          id:1,
          name_gender:"comedia"
        }
      ]
    }
  ];

  const data=10;

  const returnOBject={
    name:"pedro",
    number:10
  }

  const mockupBookRepository={
    create:jest.fn().mockResolvedValue([]),
    findAll:jest.fn().mockResolvedValue([]),
    findOne:jest.fn().mockResolvedValue([]),
    update:jest.fn().mockResolvedValue([]),
    delete:jest.fn().mockResolvedValue([]),
  }


  const mockupAuthorService = {
  findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Author 1' }),
};

const mockupGenderService = {
  findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Genre 1' }),
};

const mockupFilterBookService = {
  resultData: jest.fn().mockResolvedValue([{ id: 1, title: 'Book 1' }]),
};

  const mockupGenderRepository={

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookModule,
        {
          provide:BookRepo, useValue:mockupBookRepository
        },
        {provide:AuthorService,useValue:mockupAuthorService},
        {provide:GenderService , useValue:mockupGenderService},
        {provide:FilterBookService, useValue:mockupFilterBookService}
      ],
    })
    .overrideProvider(getRepositoryToken(Book))
    .useValue(jest.fn())
    .compile();


    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
