import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 256)
  name: string;

  @IsOptional()
  @IsString()
  @Length(1, 256)
  lastname: string;

  @IsOptional()
  @IsString()
  @Length(1, 256)
  password: string;
}
