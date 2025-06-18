import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Rating for the service (1-5 stars)',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Optional written review comment',
    example: 'Excellent service! Very professional and timely.',
    required: false,
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({
    description: 'ID of the completed booking being reviewed',
    example: 'clxyz789booking',
    format: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  bookingId: string;

  @ApiProperty({
    description: 'ID of the service provider being reviewed',
    example: 'clxyz456provider',
    format: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  providerId: string;
}
