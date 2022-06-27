import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';
import { createUserDto } from './dto/createUserDto.dto';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/authDto.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwtService: JwtService){}

    async register(createDto:createUserDto){
        const userCheck = await this.userModel.findOne({email:createDto.email});


        if(userCheck) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'User is already exist with this email!',
              }, HttpStatus.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(createDto.password,12)
        createDto.password = hashedPassword

        const user = new this.userModel(createDto); 
        user.save();

        delete user.password;

        return user;
    }

    async login(authDto:AuthDto,response){
        const user = await this.userModel.findOne({email:authDto.email});

        if (!user) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Creadentails are not metch!',
              }, HttpStatus.BAD_REQUEST);
        }

        const verifyPassword = await bcrypt.compare(authDto.password,user.password)

        if (!verifyPassword) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Creadentails are not metch!',
              }, HttpStatus.BAD_REQUEST);
        }

        const jwt = await this.jwtService.signAsync({user:{email:user.email,}});

        response.cookie('jwt',jwt,{httpOnly:true});
        
        return {message:'success'};
    }

    async getUserData(cookie){
        try {
            const user = await this.jwtService.verifyAsync(cookie);

            return user;   
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Access denied!',
              }, HttpStatus.BAD_REQUEST);
        }
    }
}
