import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ example: 'pedro' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 45 })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsNotEmpty()
  published_books: number;
}
