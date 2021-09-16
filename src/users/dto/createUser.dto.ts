import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 256)
  name: string;

  @IsString()
  @Length(1, 256)
  lastname: string;

  @IsString()
  @Length(1, 256)
  password: string;
}
