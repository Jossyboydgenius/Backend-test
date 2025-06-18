import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Service } from '@prisma/client';

interface CreateServiceDto {
  name: string;
}

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    return this.prisma.service.create({
      data: createServiceDto,
    });
  }

  async findAll(): Promise<Service[]> {
    return this.prisma.service.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string): Promise<Service | null> {
    return this.prisma.service.findUnique({
      where: { id },
    });
  }
}
