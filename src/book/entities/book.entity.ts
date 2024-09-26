import { Author } from "src/author/entities/author.entity";
import { Gender } from "src/gender/entities/gender.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("books")
export class Book {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    title:string;
    
    @Column()
    publication_date:Date;
    
    @Column()
    authorId:number;

    @ManyToOne(()=>Author,author=>author.book,{eager:true})
    @JoinColumn({name:"authorId"})
    author:Author;

    @ManyToMany(()=>Gender, (gender) => gender.books, { eager: true })
    @JoinTable()
    gender:Gender[];

}
