import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 256,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 256,
  })
  lastname: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 512,
    unique: true,
    nullable: false,
  })
  password: string;
}
