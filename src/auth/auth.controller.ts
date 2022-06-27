import { Body, Controller, Post } from "@nestjs/common";
import { ApiForbiddenResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { createUserDto } from "./dto/createUserDto.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController{
    constructor(private readonly authservice:AuthService){}

    @Post('register')
    @ApiResponse({description:'User has been created'})
    @ApiForbiddenResponse({description:'Forbidden'})
    register(@Body() createDto:createUserDto){
        return this.authservice.register(createDto);
    }
}