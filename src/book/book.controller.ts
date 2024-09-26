import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBookService } from './filterQuery/book.filterQuery';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService,
  ) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  asyncfindAll(
    @Query("title") title:string,
    @Query("date") date:Date,
    @Query("page") pagination:number, 
    @Query("limit") limit :number,
    @Query("gender") gender:string,
    @Query("sort") sort:string,
    @Query("authorName") author:string,
    @Query("authorId") authorId:number 
  ) {
 
    return this.bookService.findAll({
      date:date,
      title:title,
      page:pagination,
      limit:limit,
      gender:gender,
      sort:sort,
      author:author,
      authorId:authorId
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
