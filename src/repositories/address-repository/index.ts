import { prisma } from "@/config";
import { Address } from "@prisma/client";

async function upsert(enrollmentId: number, createdAddress: CreateAddressParams, updatedAddress: UpdateAddressParams) {
  return prisma.address.upsert({
    where: {
      enrollmentId,
    },
    create: {
      ...createdAddress,
      Enrollment: { connect: { id: enrollmentId } },
    },
    update: updatedAddress,
  });
}

export type CreateAddressParams = Omit<Address, "id" | "createdAt" | "updatedAt" | "enrollmentId">;
export type UpdateAddressParams = CreateAddressParams;

const addressRepository = {
  upsert,
};

export default addressRepository;
