import Joi from "joi";

export const createTicketActivitySchema = Joi.object<CreateTicketActivity>({
  ticketId: Joi.number().required(),
  activityId: Joi.number().required(),
});

export type CreateTicketActivity = {
    ticketId: number,
    activityId: number,
};
