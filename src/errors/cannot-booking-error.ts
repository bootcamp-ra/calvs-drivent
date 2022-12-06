import { ApplicationError } from "@/protocols";

export function cannotBookingError(): ApplicationError {
  return {
    name: "CannotBookingError",
    message: "Cannot booking this room! Overcapacity!",
  };
}
