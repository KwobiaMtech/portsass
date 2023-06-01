import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('text', { nullable: true })
  firstName?: string;

  @Column('text', { nullable: true })
  lastName?: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;
}
