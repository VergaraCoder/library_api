import { Injectable } from '@nestjs/common';
import { Gender } from '../entities/gender.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class FilterGender {
  async returnResult(repoGender: Repository<Gender>, querys: any) {
    const queryBuilder = repoGender.createQueryBuilder('genders');
    await this.filterData(queryBuilder, querys);
  }

  private async filterData(
    queryBuilder: SelectQueryBuilder<Gender>,
    querys: any,
  ) {}
}
