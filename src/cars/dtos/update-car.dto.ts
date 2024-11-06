import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsString({ message: `The brand most be a cool string` })
  readonly brand: string;

  @IsString()
  readonly model: string;
}
