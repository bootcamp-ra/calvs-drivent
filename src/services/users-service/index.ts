import { cannotEnrollBeforeStartDateError } from "@/errors";
import userRepository from "@/repositories/user-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import eventsService from "../events-service";
import { duplicatedEmailError } from "./errors";

export async function createUser({ email, password }: CreateUserParams): Promise<User> {
  await canEnrollOrFail();

  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
  });
}

// export async function createUserWithGit(email: string): Promise<User> {
//   await canEnrollOrFail();

//   await validateUniqueEmailOrFail(email);

//   return userRepository.create({
//     email,
//   });
// }

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function canEnrollOrFail() {
  const canEnroll = await eventsService.isCurrentEventActive();
  if (!canEnroll) {
    throw cannotEnrollBeforeStartDateError();
  }
}

// async function validateUniqueEmailOrFailGit(email: string) {
//   const userWithSameEmail = await userRepository.findByEmail(email);

//   return userWithSameEmail;
// }

export type CreateUserParams = Pick<User, "email" | "password">;

const userService = {
  createUser,
};

export * from "./errors";
export default userService;
