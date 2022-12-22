import { prisma } from "@prisma/client";

async function findActivitiesDays() {
  //DESCOMENTAR QUANDO O BANCO DE ATIVIDADES FOR CRIADO
  // return prisma.activitiesDays.findMany();
}

const activitiesRepository = {
  findActivitiesDays,
};

export default activitiesRepository;
