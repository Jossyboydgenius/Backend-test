import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRequest } from '../auth/interfaces/user-request.interface';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@ApiTags('Reviews')
@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a review for completed service',
    description:
      'Client submits a review and rating for a completed booking. Only the client who made the booking can review it.',
  })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({
    status: 201,
    description: 'Review created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'clxyz123review' },
        rating: { type: 'number', example: 5 },
        comment: {
          type: 'string',
          example: 'Excellent service! Very professional and timely.',
        },
        bookingId: { type: 'string', example: 'clxyz123booking' },
        clientId: { type: 'string', example: 'clxyz123client' },
        providerId: { type: 'string', example: 'clxyz456provider' },
        createdAt: { type: 'string', example: '2024-06-18T02:00:00.000Z' },
        updatedAt: { type: 'string', example: '2024-06-18T02:00:00.000Z' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation errors or booking not completed',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: [
            'rating must be between 1 and 5',
            'bookingId should not be empty',
          ],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or missing token',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - only booking client can create review',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: {
          type: 'string',
          example: 'Only the booking client can create a review',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Booking not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Booking not found' },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Review already exists for this booking',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: {
          type: 'string',
          example: 'Review already exists for this booking',
        },
      },
    },
  })
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @Request() req: UserRequest,
  ) {
    return this.reviewsService.create({
      ...createReviewDto,
      clientId: req.user.id,
    });
  }
}
