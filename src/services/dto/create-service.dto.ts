import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Name of the service type (must be unique)',
    example: 'Garden Maintenance',
    minLength: 1,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
