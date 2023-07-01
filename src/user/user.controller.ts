import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { ParamId } from "src/decorators/param-id.decorator";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {
        //
    }

    @Post()
    public async create(@Body() data: CreateUserDto) {
        return this.userService.create(data);
    }

    @Get()
    public async list() {
        return this.userService.list();
    }

    @Get(":id")
    public async show(@ParamId() id: number) {
        return this.userService.show(id);
    }

    @Put(":id")
    public async update(
        @Body() body: UpdateUserDto,
        @Param("id", ParseIntPipe) id: number,
    ) {
        return this.userService.update(id, body);
    }

    @Patch(":id")
    public async patch(
        @Body() body: UpdatePatchUserDto,
        @Param("id", ParseIntPipe) id: number,
    ) {
        return this.userService.updatePartial(id, body);
    }

    @Delete(":id")
    public async delete(@Param("id", ParseIntPipe) id: number) {
        return this.userService.delete(id);
    }
}
