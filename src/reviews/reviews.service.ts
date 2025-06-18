import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Review, BookingStatus } from '@prisma/client';

interface CreateReviewDto {
  rating: number;
  comment?: string;
  bookingId: string;
  clientId: string;
  providerId: string;
}

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    // First, check if the booking exists and is completed
    const booking = await this.prisma.booking.findUnique({
      where: { id: createReviewDto.bookingId },
      include: {
        client: { select: { id: true } },
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Check if booking is completed
    if (booking.status !== BookingStatus.COMPLETED) {
      throw new BadRequestException(
        'Reviews can only be created for completed bookings',
      );
    }

    // Check if the client making the review is the booking client
    if (booking.client.id !== createReviewDto.clientId) {
      throw new BadRequestException(
        'Only the booking client can create a review',
      );
    }

    // Check if a review already exists for this booking
    const existingReview = await this.prisma.review.findFirst({
      where: { bookingId: createReviewDto.bookingId },
    });

    if (existingReview) {
      throw new BadRequestException('Review already exists for this booking');
    }

    return this.prisma.review.create({
      data: createReviewDto,
      include: {
        booking: {
          include: {
            service: true,
          },
        },
        client: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        provider: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }
}
