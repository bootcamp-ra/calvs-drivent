import userService from "@/services/users-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

import authenticationService, { SignInParams } from "@/services/authentication-service";

export async function usersPost(req: Request, res: Response) {
  const { email, password } = req.body;

  console.log(email + password);

  try {
    const user = await userService.createUser({ email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

// export async function usersSignUpSignInWithGit(req: Request, res: Response) {
//   const { email, accessToken } = req.body;
//   console.log('entrou');
//   console.log(email + accessToken);

//   try {
//     const user = await userService.validateUniqueEmailOrFailGit(email);

//     console.log(user);

//     if (user) {
//       const result = await authenticationService.signInWithGit(email, accessToken);
//       return res.status(httpStatus.OK).send(result);
//     }

//     const user2 = await userService.createUserWithGit(email);
//     const result = await authenticationService.signInWithGit(email, accessToken);
//     return res.status(httpStatus.OK).send(result);
//   } catch (error) {
//     if (error.name === 'DuplicatedEmailError') {
//       return res.status(httpStatus.CONFLICT).send(error);
//     }
//     return res.status(httpStatus.BAD_REQUEST).send(error);
//   }
// }
