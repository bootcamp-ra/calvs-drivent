import { prisma } from "@/config";
import { Enrollment } from "@prisma/client";
import { Address } from "@prisma/client";

async function findWithAddressByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });
}

async function findById(enrollmentId: number) {
  return prisma.enrollment.findFirst({
    where: { id: enrollmentId },
  });
}

async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  return prisma.enrollment.upsert({
    where: {
      userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
}

async function upsertTransaction(
  userId: number,
  enrollmentId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
  createdAddress: CreateAddressParams,
  updatedAddress: UpdateAddressParams,
): Promise<Enrollment> {
  const enrollment2 = prisma.enrollment.update({
    where: {
      userId,
    },
    data: updatedEnrollment,
  });

  const address2 = prisma.address.upsert({
    where: {
      enrollmentId: enrollmentId,
    },
    create: {
      ...createdAddress,
      Enrollment: { connect: { id: enrollmentId } },
    },
    update: updatedAddress,
  });
  try {
    await prisma.$transaction([enrollment2, address2]);
    return enrollment2;
  } catch (error) {
    console.log(error);
  }
}

export type CreateEnrollmentParams = Omit<Enrollment, "id" | "createdAt" | "updatedAt">;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, "userId">;

export type CreateAddressParams = Omit<Address, "id" | "createdAt" | "updatedAt" | "enrollmentId">;
export type UpdateAddressParams = CreateAddressParams;

const enrollmentRepository = {
  findWithAddressByUserId,
  upsert,
  findById,
  upsertTransaction,
};

export default enrollmentRepository;
