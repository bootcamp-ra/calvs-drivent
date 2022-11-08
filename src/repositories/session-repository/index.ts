import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function create(data: Prisma.SessionUncheckedCreateInput) {
  return prisma.session.create({
    data,
  });
}

const sessionRepository = {
  create,
};

export default sessionRepository;
