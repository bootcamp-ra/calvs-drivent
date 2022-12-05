import { ApplicationError } from "@/protocols";

export function cannotListHotelsError(): ApplicationError {
  return {
    name: "cannotListHotelsError",
    message: "Cannot list hotels!",
  };
}
