import { singInPost, singInPostWithGit } from "@/controllers";
import { validateBody } from "@/middlewares";
import { signInSchema, signInSchemaOAuth } from "@/schemas";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter.post("/sign-in", validateBody(signInSchema), singInPost);

authenticationRouter.post("/oauth", validateBody(signInSchemaOAuth), singInPostWithGit);

export { authenticationRouter };
