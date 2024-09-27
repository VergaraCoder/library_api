import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenderDto {
  @ApiProperty({ example: 'accion' })
  @IsString()
  @IsNotEmpty()
  name_gender: string;
}
