import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create({ name, email, password, birthAt }: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
        birthAt,
      },
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    { name, email, password, birthAt }: UpdatePutUserDTO,
  ) {
    return this.prisma.user.update({
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
      where: {
        id,
      },
    });
  }

  async updatePartial(
    id: number,
    { name, email, password, birthAt }: UpdatePatchUserDTO,
  ) {
    const data: any = {};

    if (name) {
      data.name = name;
    }

    if (email) {
      data.email = email;
    }

    if (password) {
      data.password = password;
    }

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }

    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
