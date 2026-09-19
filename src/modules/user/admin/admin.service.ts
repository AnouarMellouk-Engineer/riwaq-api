import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/user.entity';
import { School } from 'src/database/school.entity';
import { Role, UserStatus } from 'src/database/enums';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ChangeStatusDto } from './dto/change-status.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
  ) {}

  // Every operation is scoped to the caller's school (multi-tenant isolation),
  // resolved once here from the slug carried in the JWT payload.
  private async resolveSchoolId(schoolSlug: string): Promise<string> {
    const school = await this.schoolRepository.findOne({
      where: { slug: schoolSlug },
    });
    if (!school) {
      throw new NotFoundException('School not found');
    }
    return school.id;
  }

  async findAll(schoolSlug: string): Promise<User[]> {
    const schoolId = await this.resolveSchoolId(schoolSlug);

    return this.userRepository.find({
      where: { school_id: schoolId, role: Role.ADMIN },
      order: { first_name: 'ASC' },
    });
  }

  async findById(schoolSlug: string, adminId: string): Promise<User> {
    const admin = await this.userRepository.findOne({
      where: {
        id: adminId,
        role: Role.ADMIN,
        school: { slug: schoolSlug },
      },
      relations: { school: true },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }

  async create(schoolSlug: string, dto: CreateAdminDto): Promise<User> {
    const schoolId = await this.resolveSchoolId(schoolSlug);

    const existing = await this.userRepository.findOne({
      where: [
        { email: dto.email, school_id: schoolId },
        { username: dto.username },
      ],
    });
    if (existing) {
      throw new ConflictException(
        'A user with this email or username already exists',
      );
    }

    const admin = this.userRepository.create({
      ...dto,
      role: Role.ADMIN,
      status: UserStatus.INVITED,
      school_id: schoolId,
    });

    return this.userRepository.save(admin);
  }

  async modify(
    schoolSlug: string,
    adminId: string,
    dto: UpdateAdminDto,
  ): Promise<User> {
    const admin = await this.findById(schoolSlug, adminId);
    Object.assign(admin, dto);
    return this.userRepository.save(admin);
  }

  async changeStatus(
    schoolSlug: string,
    adminId: string,
    dto: ChangeStatusDto,
  ): Promise<User> {
    const admin = await this.findById(schoolSlug, adminId);
    admin.status = dto.status;
    return this.userRepository.save(admin);
  }

  async delete(
    schoolSlug: string,
    adminId: string,
  ): Promise<{ message: string }> {
    const admin = await this.findById(schoolSlug, adminId);
    await this.userRepository.remove(admin);
    return { message: 'Admin deleted successfully' };
  }
}
