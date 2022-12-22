import { notFoundError } from "@/errors";
import activitiesRepository from "@/repositories/activities-repository";

async function getActivitiesDays() {
  const activitiesDays = await activitiesRepository.findActivitiesDays();

  //DESCOMENTAR QUANDO O BANCO DE ATIVIDADES FOR CRIADO
  //   if (!activitiesDays) {
  //     throw notFoundError();
  //   }
  return activitiesDays;
}

const activitiesService = {
  getActivitiesDays,
};

export default activitiesService;
