import * as z from "zod"

export const userSignUpSchema = z.object({
  username: z.string(),
  password: z.string().min(5),
})
