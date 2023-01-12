import { PrismaClient } from "@prisma/client";
import { createClient, RedisClientType } from "redis";

export let prisma: PrismaClient;
export function connectDb(): void {
  prisma = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}

export let redisClient: RedisClientType;
export async function connectRedisDb(): Promise<void> {
  redisClient = createClient();
  await redisClient.connect();
}
