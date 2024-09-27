import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    const dataAuthor = await this.authorService.create(createAuthorDto);
    return dataAuthor;
  }

  @Get()
  findAll(
    @Query('age') age: number,
    @Query('age_gt') age2: number,
    @Query('age_lt') age3: number,
    @Query('age_gte') age4: number,
    @Query('age_lte') age5: number,
    @Query('published') publis:number,
    @Query('published_gt') publis2:number,
    @Query('published_lt') publis3:number,
    @Query('published_gte') publis4:number,
    @Query('published_lte') publis5:number,
  ) {
    return this.authorService.findAll({
      age:age,
      age_gt:age2,
      age_lt:age3,
      age_gte:age4,
      age_lte:age5,
      publishedBooks:publis,
      publishedBooks_gt:publis2,
      publishedBooks_lt:publis3,
      publishedBooks_gte:publis4,
      publishedBooks_lte:publis5,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne2(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
