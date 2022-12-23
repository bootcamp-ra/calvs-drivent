import { notFoundError } from "@/errors";
import activitiesRepository from "@/repositories/activities-repository";

async function getActivitiesDays() {
  const activitiesDays = await activitiesRepository.findActivitiesDays();

  if (!activitiesDays) {
    throw notFoundError();
  }
  return activitiesDays;
}

const activitiesService = {
  getActivitiesDays,
};

export default activitiesService;
