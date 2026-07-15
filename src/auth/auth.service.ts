import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { School } from 'src/entities/school.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateNewTenantDto } from './dtos/createNewTenant.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(School) private schoolRepo: Repository<School>,
  ) {}

  async createNewTenant(createDto: CreateNewTenantDto) {
    const slug = createDto.schoolName.replace(' ', '_');

    const existingSchool = await this.schoolRepo.findOneBy({ slug });
    if (existingSchool) {
      throw new ConflictException('A school with this name already exists');
    }

    const existingUser = await this.userRepo.findOneBy({
      email: createDto.email,
    });
    if (existingUser) {
      throw new ConflictException('An account with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createDto.password, 12);

    const school = this.schoolRepo.create({
      name: createDto.schoolName,
      slug,
      users: [
        {
          firstName: createDto.firstName,
          lastName: createDto.lastName,
          email: createDto.email,
          address: createDto.address,
          password: hashedPassword,
        },
      ],
    });

    const user = (await this.schoolRepo.save(school)).users[0];

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}
