import { Book } from "src/book/entities/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("authors")
export class Author {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    age:string;

    @Column()
    published_books:number;

    @OneToMany(()=>Book,book=>book.author)
    book:Book[];
}
