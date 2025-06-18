import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Booking, BookingStatus } from '@prisma/client';

interface CreateBookingDto {
  serviceId: string;
  clientId: string;
  providerId?: string;
  scheduledDate: Date;
}

interface UpdateBookingStatusDto {
  status: BookingStatus;
}

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.prisma.booking.create({
      data: createBookingDto,
      include: {
        service: true,
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            userType: true,
          },
        },
        provider: {
          select: {
            id: true,
            name: true,
            email: true,
            userType: true,
          },
        },
      },
    });
  }

  async findByUserId(userId: string): Promise<Booking[]> {
    return this.prisma.booking.findMany({
      where: {
        OR: [{ clientId: userId }, { providerId: userId }],
      },
      include: {
        service: true,
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            userType: true,
          },
        },
        provider: {
          select: {
            id: true,
            name: true,
            email: true,
            userType: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(
    bookingId: string,
    userId: string,
    updateDto: UpdateBookingStatusDto,
  ): Promise<Booking> {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Only provider can accept/reject bookings
    if (booking.providerId !== userId) {
      throw new ForbiddenException(
        'Only the assigned provider can update booking status',
      );
    }

    return this.prisma.booking.update({
      where: { id: bookingId },
      data: { status: updateDto.status },
      include: {
        service: true,
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            userType: true,
          },
        },
        provider: {
          select: {
            id: true,
            name: true,
            email: true,
            userType: true,
          },
        },
      },
    });
  }
}
