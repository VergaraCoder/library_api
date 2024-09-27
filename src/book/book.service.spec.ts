import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { AuthorService } from 'src/author/author.service';
import { GenderService } from 'src/gender/gender.service';

describe('BookService', () => {
  let service: BookService;
  let bookRepository: Repository<Book>;
  let authorService: AuthorService;
  let genderService: GenderService;
 // let service: BookService;

 const mockoutRepository={
  create:jest.fn().mockReturnValue({id:'179e5620-28aa-4cee-85b4-76e487b8f725', title:"test"}),

  save:jest.fn().mockResolvedValue({d:'179e5620-28aa-4cee-85b4-76e487b8f725', title:"test"})
 }

 const mockAuthorService = {
  findOne: jest.fn().mockResolvedValue({ id: 1 }),
};

const mockGenderService = {
  findOne: jest.fn().mockResolvedValue({ id: 1 }),
};


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it("should",()=>{
  //   expect(service.create(CreateBookDto)).toBe();
  // })
});
