import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDto{
@ApiProperty({required:true})
 @Prop({required:true})
 email:string
 
 @ApiProperty({required:true})
 @Prop({required:true})
 password:string
}