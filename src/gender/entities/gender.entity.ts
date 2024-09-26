import { Book } from "src/book/entities/book.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("genders")
export class Gender {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name_gender:string;


    @ManyToMany(() => Book, (book) => book.gender)
    books: Book[];
}
