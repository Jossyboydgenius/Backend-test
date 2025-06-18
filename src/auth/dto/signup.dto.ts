import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '@prisma/client';

export class SignupDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
    minLength: 1,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Valid email address for user authentication',
    example: 'john@example.com',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Secure password for user account (minimum 6 characters)',
    example: 'password123',
    minLength: 6,
    maxLength: 50,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description:
      'Type of user account - CLIENT for service consumers, PROVIDER for service providers',
    enum: UserType,
    example: UserType.CLIENT,
    enumName: 'UserType',
  })
  @IsEnum(UserType)
  userType: UserType;
}
