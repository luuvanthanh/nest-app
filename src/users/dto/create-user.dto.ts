import { Role } from "src/role.enum";

export class CreateUserDto {
    email: string;
    password: string;
    role: Role
}
