import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRequest } from '../auth/interfaces/user-request.interface';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';

@ApiTags('Bookings')
@Controller('api/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new booking',
    description:
      'Client creates a booking for a specific service. The booking will be in PENDING status until a provider accepts it.',
  })
  @ApiBody({ type: CreateBookingDto })
  @ApiResponse({
    status: 201,
    description: 'Booking created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'clxyz123booking' },
        serviceId: { type: 'string', example: 'clxyz123service' },
        clientId: { type: 'string', example: 'clxyz123client' },
        providerId: { type: 'string', nullable: true, example: null },
        status: { type: 'string', example: 'PENDING' },
        scheduledDate: { type: 'string', example: '2024-07-01T10:00:00.000Z' },
        createdAt: { type: 'string', example: '2024-06-18T00:00:00.000Z' },
        updatedAt: { type: 'string', example: '2024-06-18T00:00:00.000Z' },
        service: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'clxyz123service' },
            name: { type: 'string', example: 'Plumbing' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation errors',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: [
            'serviceId should not be empty',
            'scheduledDate must be a valid ISO 8601 date string',
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
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @Request() req: UserRequest,
  ) {
    return this.bookingsService.create({
      ...createBookingDto,
      scheduledDate: new Date(createBookingDto.scheduledDate),
      clientId: req.user.id,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get user bookings',
    description:
      'Retrieve all bookings for the authenticated user. Clients see their created bookings, providers see bookings assigned to them.',
  })
  @ApiResponse({
    status: 200,
    description: 'Bookings retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'clxyz123booking' },
          serviceId: { type: 'string', example: 'clxyz123service' },
          clientId: { type: 'string', example: 'clxyz123client' },
          providerId: { type: 'string', example: 'clxyz456provider' },
          status: { type: 'string', example: 'ACCEPTED' },
          scheduledDate: {
            type: 'string',
            example: '2024-07-01T10:00:00.000Z',
          },
          createdAt: { type: 'string', example: '2024-06-18T00:00:00.000Z' },
          updatedAt: { type: 'string', example: '2024-06-18T01:00:00.000Z' },
          service: {
            type: 'object',
            properties: {
              id: { type: 'string', example: 'clxyz123service' },
              name: { type: 'string', example: 'Plumbing' },
            },
          },
          client: {
            type: 'object',
            properties: {
              id: { type: 'string', example: 'clxyz123client' },
              name: { type: 'string', example: 'John Doe' },
              email: { type: 'string', example: 'john@example.com' },
            },
          },
          provider: {
            type: 'object',
            nullable: true,
            properties: {
              id: { type: 'string', example: 'clxyz456provider' },
              name: { type: 'string', example: 'Jane Smith' },
              email: { type: 'string', example: 'jane@example.com' },
            },
          },
        },
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
  async findUserBookings(@Request() req: UserRequest) {
    return this.bookingsService.findByUserId(req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update booking status',
    description:
      'Provider updates the status of a booking. Valid transitions: PENDING→ACCEPTED/REJECTED, ACCEPTED→COMPLETED/CANCELLED.',
  })
  @ApiParam({
    name: 'id',
    description: 'Booking ID',
    example: 'clxyz123booking',
  })
  @ApiBody({ type: UpdateBookingStatusDto })
  @ApiResponse({
    status: 200,
    description: 'Booking status updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'clxyz123booking' },
        status: { type: 'string', example: 'ACCEPTED' },
        updatedAt: { type: 'string', example: '2024-06-18T01:00:00.000Z' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid status transition',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Invalid status transition' },
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
    description: 'Forbidden - only assigned provider can update booking',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: {
          type: 'string',
          example: 'Only assigned provider can update this booking',
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
  async updateStatus(
    @Param('id') id: string,
    @Body() updateBookingStatusDto: UpdateBookingStatusDto,
    @Request() req: UserRequest,
  ) {
    return this.bookingsService.updateStatus(
      id,
      req.user.id,
      updateBookingStatusDto,
    );
  }
}
