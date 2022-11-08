import { ApplicationError } from "@/protocols";

export function cannotEnrollBeforeStartDateError(): ApplicationError {
  return {
    name: "CannotEnrollBeforeStartDateError",
    message: "Cannot enroll before event start date!",
  };
}
