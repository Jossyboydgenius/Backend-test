import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthToken, TokenType } from '@prisma/client';

@Injectable()
export class AuthTokenService {
  constructor(private prisma: PrismaService) {}

  async createAccessToken(
    userId: string,
    token: string,
    expiresAt: Date,
  ): Promise<AuthToken> {
    return this.prisma.authToken.create({
      data: {
        userId,
        token,
        type: TokenType.ACCESS,
        expiresAt,
      },
    });
  }

  async createRefreshToken(
    userId: string,
    token: string,
    expiresAt: Date,
  ): Promise<AuthToken> {
    return this.prisma.authToken.create({
      data: {
        userId,
        token,
        type: TokenType.REFRESH,
        expiresAt,
      },
    });
  }

  async findByToken(token: string): Promise<AuthToken | null> {
    return this.prisma.authToken.findUnique({
      where: { token },
    });
  }

  async deleteExpiredTokens(): Promise<void> {
    await this.prisma.authToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }

  async deleteUserTokens(userId: string): Promise<void> {
    await this.prisma.authToken.deleteMany({
      where: { userId },
    });
  }
}
