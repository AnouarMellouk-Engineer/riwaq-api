import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { School } from "src/entities/school.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";



@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) userRepo :Repository<User>,@InjectRepository(School) schoolRepo :Repository<School>){

    }



    createNewTenant(){

    }

}