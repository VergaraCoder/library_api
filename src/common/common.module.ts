import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthorModule } from "src/author/author.module";
import { BookModule } from "src/book/book.module";
import { GenderModule } from "src/gender/gender.module";

@Module({
    imports:[GenderModule,AuthorModule,BookModule],
    providers:[],
    exports:[]
})
export class CommonModule{}