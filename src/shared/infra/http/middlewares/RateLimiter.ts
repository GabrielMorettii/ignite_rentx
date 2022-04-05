import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import * as redis from 'redis';

import AppError from '@shared/errors/AppError';

const redisClient = redis.createClient({
  legacyMode: true,
  url: process.env.REDIS_URL,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 10, // 10 requests
  duration: 5, // per 1 second by IP
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await redisClient.connect();

    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError('Too many requests', 429);
  } finally {
    await redisClient.disconnect();
  }
}
