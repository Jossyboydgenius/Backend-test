import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus } from '@prisma/client';

export class UpdateBookingStatusDto {
  @ApiProperty({
    description:
      'New status for the booking. Valid transitions: PENDING→ACCEPTED/REJECTED, ACCEPTED→COMPLETED/CANCELLED',
    enum: BookingStatus,
    example: BookingStatus.ACCEPTED,
    enumName: 'BookingStatus',
  })
  @IsEnum(BookingStatus)
  status: BookingStatus;
}
