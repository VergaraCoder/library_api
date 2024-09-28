import {Book} from '../../book//entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  publishedBooks: number;

  @OneToMany(() => Book, (book) => book.author)
  book: Book[];
}
