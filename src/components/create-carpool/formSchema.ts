import { z } from "zod";

export const formSchema = z.object({
  startLocation: z
    .string()
    .min(3, { message: "Activity name should be atleast 3 chars" }),
  endLocation: z.string().max(100).optional(),
  startTime: z.coerce.number().min(1).max(7),
  seats: z.coerce.number().min(1).max(3),
});
