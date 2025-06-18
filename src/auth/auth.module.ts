import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthTokenService } from './auth-token.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const secret =
          configService.get<string>('JWT_SECRET') ||
          'default-jwt-secret-for-development-only';
        console.log(
          '🔐 JWT Configuration - Secret loaded:',
          secret ? 'Yes' : 'No',
        );
        return {
          secret,
          signOptions: {
            expiresIn: '24h', // Back to string format
          },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthTokenService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
