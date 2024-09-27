import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { errorManage } from 'src/common/err/error.manage.error';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  create(createAuthorDto: Partial<Author>) {
    try {
      const createAuthor = this.authorRepository.create(createAuthorDto);
      return this.authorRepository.save(createAuthor);
    } catch (err: any) {
      throw errorManage.errorSignature(err.message);
    }
  }

  async findAll() {
    try {
      const data = await this.authorRepository.find();
      if (!data) {
        throw new errorManage({
          type: 'NOT_FOUND',
          message: 'Authores not found',
        });
      }
    } catch (err: any) {
      throw errorManage.errorSignature(err.message);
    }
  }

  async findOne(name: string) {
    try {
      const dataAuthor = await this.authorRepository.findOne({
        where: { name: name },
      });
      if (!dataAuthor) {
        throw new errorManage({
          type: 'NOT_FOUND',
          message: 'Incorret credentials',
        });
      }
      await this.updateNumberOfBook(dataAuthor);
      return dataAuthor;
    } catch (err: any) {
      throw errorManage.errorSignature(err.message);
    }
  }

  async findOne2(id: number) {
    try {
      const dataAuthor = await this.authorRepository.findOne({
        where: { id: id },
      });
      if (!dataAuthor) {
        throw new errorManage({
          type: 'NOT_FOUND',
          message: 'Incorrect credentials',
        });
      }
      return dataAuthor;
    } catch (err: any) {
      throw errorManage.errorSignature(err.message);
    }
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    try {
      const dataReturn = await this.findOne2(id);
      const updateLog = await this.authorRepository.update(
        dataReturn.id,
        updateAuthorDto,
      );
      return updateLog;
    } catch (err: any) {
      throw errorManage.errorSignature(err.message);
    }
  }

  async updateNumberOfBook(dataAuthor: any) {
    try {
      const update = await this.authorRepository.update(dataAuthor.id, {
        published_books: dataAuthor.published_books + 1,
      });
      return update;
    } catch (err: any) {
      throw err;
    }
  }

  async remove(id: number) {
    const dataDelete = await this.authorRepository.delete({ id: id });
    return dataDelete;
  }
}
