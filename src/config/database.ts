import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";

export let prisma: PrismaClient;
export const cache = createClient();
 
export function connectDb(): void {
  prisma = new PrismaClient();
}

export async function connectCache(): Promise<void> {
  await cache.connect();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}

export async function disconnectCache(): Promise<void> {
  await cache.disconnect();
}
