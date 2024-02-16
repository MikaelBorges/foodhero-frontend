import * as z from "zod";

const fullInfoUser = {
  firstname: z.string(),
  lastname: z.string(),
  phone: z.string(),
  email: z.string(),
  password: z.string(),
};

export const registerSchema = z.object(fullInfoUser);
export const updateSchema = z.object(fullInfoUser);
