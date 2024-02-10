import * as z from "zod";

const userFullInfo = {
  firstname: z.string(),
  lastname: z.string(),
  phone: z.string(),
  email: z.string(),
  password: z.string(),
};

export const registerSchema = z.object(userFullInfo);
export const updateSchema = z.object(userFullInfo);
