import { Injectable } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";
import { Book } from "../entities/book.entity";


@Injectable()
export class FilterBookService{

    async resultData(repo:Repository<Book>,querys:any){
        const query=repo.createQueryBuilder("books");
        const resultFilter= await this.filterData(query,querys);
        return resultFilter;
    }

    async filterData(query:SelectQueryBuilder<Book>,querys:any){
        if(querys.gender){
            console.log("el nombre del genero es ");
                console.log(querys.gender);
                
            query.innerJoinAndSelect("books.gender","genders");
            query.andWhere("genders.name_gender=:nameGender",{nameGender:querys.gender});
        }
        if(querys.authorId){
            query.innerJoinAndSelect("books.authorId","authors");
        }
        if(querys.author){
            query.innerJoinAndSelect("books.author","authors");
            query.andWhere("authors.name=:authorName",{authorName:querys.author});
        }
        if(querys.limit){
            const limit=querys.limit ? querys.limit : 0;
            const skip= querys.page ? parseInt(querys.page) : 1;   
            
            query.skip((skip-1) * limit);
            query.take(limit);
        }
        if(querys.sort){
            let upperletterSort=querys.sort.toLocaleUpperCase();
            query.orderBy("books.title",upperletterSort);
        }
        
        return await query.getMany();
    }

}