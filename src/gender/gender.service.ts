import { Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenderService {
  constructor(@InjectRepository(Gender) private genderRepository:Repository<Gender>){}

  async create(createGenderDto: CreateGenderDto) {
    const createGender=this.genderRepository.create(createGenderDto);
    await this.genderRepository.save(createGender);
    return createGender;
  }

  async findAll() {
    return await this.genderRepository.find();
  }

  async findOne(genders: string[]) {
    let gendersId=[];
    for(const gender of genders){
      const returnGender=await this.genderRepository.findOne({where:{name_gender:gender}});
      if(!returnGender){

      }else{
        gendersId.push(returnGender.id);
      }
    }
    return gendersId;
  }

  update(id: number, updateGenderDto: UpdateGenderDto) {
    return `This action updates a #${id} gender`;
  }

  async remove(id: number) {
    const dataDelete=await this.genderRepository.delete({id:id});
    return dataDelete;
  }
}
