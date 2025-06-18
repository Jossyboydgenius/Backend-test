import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({
    description: 'ID of the service being booked',
    example: 'clxyz123service',
    format: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  serviceId: string;

  @ApiProperty({
    description:
      'Optional specific provider ID (if not provided, any available provider can accept)',
    example: 'clxyz456provider',
    required: false,
    format: 'uuid',
  })
  @IsOptional()
  @IsString()
  providerId?: string;

  @ApiProperty({
    description: 'Preferred date and time for the service (ISO 8601 format)',
    example: '2024-07-01T10:00:00Z',
    format: 'date-time',
  })
  @IsDateString()
  scheduledDate: string;
}
