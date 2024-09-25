import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";




@Injectable()
export class validationData implements PipeTransform<any>{
    transform(value: any, metadata: ArgumentMetadata) {
        console.log(value);
        console.log("y la otra data es ");
        
        console.log(metadata);
        
        
    }   
}