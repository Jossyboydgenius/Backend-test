import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';

@ApiTags('Services')
@Controller('api/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @ApiOperation({
    summary: 'List all available services',
    description:
      'Publicly accessible endpoint to retrieve all service types offered on the platform.',
  })
  @ApiResponse({
    status: 200,
    description: 'Services retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'clxyz123service' },
          name: { type: 'string', example: 'Plumbing' },
          createdAt: { type: 'string', example: '2024-06-18T00:00:00.000Z' },
          updatedAt: { type: 'string', example: '2024-06-18T00:00:00.000Z' },
        },
      },
      example: [
        {
          id: 'clxyz123service',
          name: 'Plumbing',
          createdAt: '2024-06-18T00:00:00.000Z',
          updatedAt: '2024-06-18T00:00:00.000Z',
        },
        {
          id: 'clxyz456service',
          name: 'Electrical Work',
          createdAt: '2024-06-18T00:00:00.000Z',
          updatedAt: '2024-06-18T00:00:00.000Z',
        },
        {
          id: 'clxyz789service',
          name: 'Cleaning',
          createdAt: '2024-06-18T00:00:00.000Z',
          updatedAt: '2024-06-18T00:00:00.000Z',
        },
      ],
    },
  })
  async findAll() {
    return this.servicesService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create new service type',
    description:
      'Admin only endpoint to create new service categories. Requires authentication.',
  })
  @ApiBody({ type: CreateServiceDto })
  @ApiResponse({
    status: 201,
    description: 'Service created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'clxyz123service' },
        name: { type: 'string', example: 'Garden Maintenance' },
        createdAt: { type: 'string', example: '2024-06-18T00:00:00.000Z' },
        updatedAt: { type: 'string', example: '2024-06-18T00:00:00.000Z' },
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
          example: ['name should not be empty'],
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
    status: 409,
    description: 'Service name already exists',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'Service name already exists' },
      },
    },
  })
  async create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }
}
