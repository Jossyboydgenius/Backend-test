import { PrismaClient, UserType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Create services
  const plumbingService = await prisma.service.upsert({
    where: { name: 'Plumbing' },
    update: {},
    create: {
      name: 'Plumbing',
    },
  });

  const cleaningService = await prisma.service.upsert({
    where: { name: 'Cleaning' },
    update: {},
    create: {
      name: 'Cleaning',
    },
  });

  const electricalService = await prisma.service.upsert({
    where: { name: 'Electrical Work' },
    update: {},
    create: {
      name: 'Electrical Work',
    },
  });

  console.log('Services created:', {
    plumbingService,
    cleaningService,
    electricalService,
  });

  // Create sample users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const client = await prisma.user.upsert({
    where: { email: 'client@example.com' },
    update: {},
    create: {
      email: 'client@example.com',
      name: 'John Client',
      password: hashedPassword,
      userType: UserType.CLIENT,
    },
  });

  const provider = await prisma.user.upsert({
    where: { email: 'provider@example.com' },
    update: {},
    create: {
      email: 'provider@example.com',
      name: 'Jane Provider',
      password: hashedPassword,
      userType: UserType.PROVIDER,
    },
  });

  console.log('Users created:', { client, provider });

  // Create sample bookings
  const booking1 = await prisma.booking.create({
    data: {
      serviceId: plumbingService.id,
      clientId: client.id,
      providerId: provider.id,
      scheduledDate: new Date('2024-02-01T10:00:00Z'),
      status: 'COMPLETED',
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      serviceId: cleaningService.id,
      clientId: client.id,
      providerId: provider.id,
      scheduledDate: new Date('2024-02-02T14:00:00Z'),
      status: 'COMPLETED',
    },
  });

  const booking3 = await prisma.booking.create({
    data: {
      serviceId: electricalService.id,
      clientId: client.id,
      providerId: provider.id,
      scheduledDate: new Date('2024-02-03T09:00:00Z'),
      status: 'COMPLETED',
    },
  });

  console.log('Sample bookings created:', { booking1, booking2, booking3 });

  // Create sample reviews for completed bookings
  const review1 = await prisma.review.create({
    data: {
      rating: 5,
      comment:
        'Excellent plumbing service! Fixed the issue quickly and professionally.',
      bookingId: booking1.id,
      clientId: client.id,
      providerId: provider.id,
    },
  });

  const review2 = await prisma.review.create({
    data: {
      rating: 4,
      comment: 'Good cleaning service. House looks great and arrived on time.',
      bookingId: booking2.id,
      clientId: client.id,
      providerId: provider.id,
    },
  });

  const review3 = await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Outstanding electrical work! Very knowledgeable and efficient.',
      bookingId: booking3.id,
      clientId: client.id,
      providerId: provider.id,
    },
  });

  console.log('Sample reviews created:', { review1, review2, review3 });

  console.log('Database seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
