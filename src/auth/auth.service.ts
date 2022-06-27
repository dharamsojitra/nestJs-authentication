import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';
import { createUserDto } from './dto/createUserDto.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async register(createDto:createUserDto){
        const userCheck = await this.userModel.findOne({email:createDto.email});


        if(userCheck) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'User is already exist with this email!',
              }, HttpStatus.BAD_REQUEST);
        }

        const user = new this.userModel(createDto); 

        return user.save();
    }
}
