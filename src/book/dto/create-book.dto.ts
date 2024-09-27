import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'pedro garcia' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ example: ['accion', 'comedia', 'ficcion'] })
  @IsNotEmpty()
  @IsNotEmpty()
  gender: string[];
}
