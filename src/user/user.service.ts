import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {
        //
    }

    async create({ email, name, password, birthAt }: CreateUserDto) {
        return this.prisma.user.create({
            data: {
                email,
                name,
                password,
                birthAt: birthAt ? new Date(birthAt) : null,
            },
        });
    }

    async list() {
        return this.prisma.user.findMany();
    }

    async show(id: number) {
        await this.exists(id);
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async update(
        id: number,
        { name, email, password, birthAt }: UpdateUserDto,
    ) {
        await this.exists(id);
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
        { name, email, password, birthAt }: UpdatePatchUserDto,
    ) {
        await this.exists(id);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = {};

        if (birthAt) {
            data.birthAt = new Date(birthAt);
        }
        if (name) {
            data.name = name;
        }
        if (email) {
            data.email = email;
        }
        if (password) {
            data.password = password;
        }

        return this.prisma.user.update({
            data,
            where: {
                id,
            },
        });
    }

    async delete(id: number) {
        await this.exists(id);

        return this.prisma.user.delete({
            where: {
                id,
            },
        });
    }

    async exists(id: number) {
        if (!(await this.prisma.user.count({ where: { id } }))) {
            throw new NotFoundException("User not found");
        }
    }
}
