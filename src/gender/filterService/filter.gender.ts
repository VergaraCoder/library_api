import { Injectable } from '@nestjs/common';
import { Gender } from '../entities/gender.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class FilterGender {
  async returnResult(repoGender: Repository<Gender>, querys: any) {
    const queryBuilder = repoGender.createQueryBuilder('genders');
    return await this.filterData(queryBuilder, querys);
  }

  private async filterData(
    queryBuilder: SelectQueryBuilder<Gender>,
    querys: any,
  ) {

      const limit=querys.limit ? querys.limit : 0;

      const skip=querys.page ? querys.pase : 1 ;

      querys.sort ? queryBuilder.orderBy("genders.name_gender",querys.sort.toLocaleUpperCase()) : "";

      queryBuilder.skip((skip-1) * limit);
      queryBuilder.take(limit);
      return await queryBuilder.getMany();
  }
}
