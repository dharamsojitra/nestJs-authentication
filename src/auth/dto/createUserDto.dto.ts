import { Prop } from "@nestjs/mongoose";

export class createUserDto{
    @Prop()
    name:string;

    @Prop()
    email:string;

    @Prop()
    password:string;
}