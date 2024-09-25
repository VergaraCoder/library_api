import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("genders")
export class Gender {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name_gender:string;
}
