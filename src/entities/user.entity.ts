import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('text')
    firstName: string;

    @Column('text')
    lastName: string;

    @Column('text')
    email: string;

    @Column('text')
    password: string;

}