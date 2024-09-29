import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity'; // Asegúrate de que esta importación sea correcta
import { AuthorService } from 'src/author/author.service';
import { GenderService } from 'src/gender/gender.service';
import { FilterBookService } from './filterQuery/book.filterQuery';


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
  resultData:jest.fn().mockResolvedValue([
    {
      id: '179e5620-28aa-4cee-85b4-76e487b8f725',
      title: "viuda",
      publication_date: new Date(),
      authorId: 1,
      author: { id: 1, name: "John Doe", age: 45, publishedBooks: 3, book: [] },
      gender: [{ id: 1, name_gender: "comedia",books:[] }]
    }
  ])
}



describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book), 
          useValue: {
       
            findOne: jest.fn().mockResolvedValue({
              id: '179e5620-28aa-4cee-85b4-76e487b8f725',
              title: "viuda",
              publication_date: new Date(),
              authorId: 1,
              author: { id: 1, name: "John Doe", age: 45, publishedBooks: 3, book: [] },
              gender: [{ id: 1, name_gender: "comedia",books:[] }]
            }),
          },
        },
        {
          provide:AuthorService,
          useValue:mockerAuthorService
        },
        {
          provide:GenderService,
          useValue:mockerGenderService
        },
        {
          provide:FilterBookService,
          useValue:mockerFilterBookService
        }
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a book by id', async () => {
    const result = {
      id: '179e5620-28aa-4cee-85b4-76e487b8f725',
      title: "viuda",
      publication_date: new Date(),
      authorId: 1,
      author: { id: 1, name: "John Doe", age: 45, publishedBooks: 3, book: [] },
      gender: [{ id: 1, name_gender: "comedia",books:[] }]
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(result);
    const response = await controller.findOne('179e5620-28aa-4cee-85b4-76e487b8f725');
    expect(response).toBe(result);
  });
});
