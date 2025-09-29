import { Role } from 'src/role.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER
    })
    role: Role

    @Column({ type: 'varchar', length: 255, nullable: true })
    image_url: string;

    @Column({ nullable: true })
    address: string;
}
