import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Author } from '../entities/author.entity';

@Injectable()
export class FilterAuthorService {
  async returnResult(repoAuthor: Repository<Author>, querys: any) {
    const query = repoAuthor.createQueryBuilder('authors');
    await this.filterData(query, querys);
  }

  async filterData(queryBuilder: SelectQueryBuilder, querys: any) {

  }
}
