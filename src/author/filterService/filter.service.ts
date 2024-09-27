import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Author } from '../entities/author.entity';
import {dataFilter} from '../interface/interface';
import { operatorsSql } from '../interface/querysSql';

@Injectable()
export class FilterAuthorService {
  async returnResult(repoAuthor: Repository<Author>, querys: any) {
    const query = repoAuthor.createQueryBuilder('authors');
    const data=await this.filterData(query, querys);    
    return data;
  }

  async filterData(queryBuilder: SelectQueryBuilder<Author>, querys: any){

    for(const x of Object.keys(querys)){
      const operator=this.returnOperator(x);
      if(querys[x]){      
        queryBuilder.andWhere(`authors.${operator[1]} ${operator[0]}:value`,{value:querys[x]});
      }    
    }
    return await queryBuilder.getMany();
  }



  private returnOperator(query:any){
    const coincidentials=query.match(/_(gt|lt|gte|lte)$/);
    if(coincidentials){
      const propertie=coincidentials.input.split("_")[0];
      const operator= operatorsSql[coincidentials[0]];
      return [operator,propertie]; 
    }
  }
}





