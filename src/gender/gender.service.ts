import { Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { Repository } from 'typeorm';
import { errorManage } from 'src/common/err/error.manage.error';

@Injectable()
export class GenderService {
  constructor(@InjectRepository(Gender) private genderRepository:Repository<Gender>){}

  async create(createGenderDto: CreateGenderDto) {
    const createGender=this.genderRepository.create(createGenderDto);
    await this.genderRepository.save(createGender);
    return createGender;
  }

  async findAll() {
    try{
    const data=await this.genderRepository.find();
    if(!data){
      throw new errorManage({
        type:"NOT_FOUND",
        message:"Registers not found"
      });
    }
    return data;
    }catch(err:any){
      throw errorManage.errorSignature(err.message);
    }
  }

  async findOne(genders: string[]) {
    try{
      let gendersId=[];
    for(const gender of genders){
      const returnGender=await this.genderRepository.findOne({where:{name_gender:gender}});
      if(!returnGender){
        throw new errorManage({
          type:"BAD_REQUEST",
          message:"some gender not exist"
        });
      }else{
        gendersId.push(returnGender);
      }
    }
    return gendersId;
    }catch(err:any){
      throw errorManage.errorSignature(err.message);
    }
  }

    async findOne2(id: number) {
      try{
          const returnGender=await this.genderRepository.findOne({where:{id:id}});
          if(!returnGender){
            throw new errorManage({
              type:"NOT_FOUND",
              message:"Incorrect credentials"
            });
          }
        return returnGender;
      }catch(err:any){
        throw errorManage.errorSignature(err.message);
      }
    }

  async update(id: number, updateGenderDto: UpdateGenderDto) {
    try{
      const dataReturn=await this.findOne2(id);
      const updateLog=await this.genderRepository.update(dataReturn.id,updateGenderDto);
      return updateLog;
    }catch(err:any){
      throw errorManage.errorSignature(err.message);
    }
  }

  async remove(id: number) {
    const dataDelete=await this.genderRepository.delete({id:id});
    return dataDelete;
  }
}
