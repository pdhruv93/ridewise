import { z, type ZodIssue } from "zod";

export const formSchema = z.object({
  startLocation: z
    .string()
    .min(3, { message: "Activity name should be atleast 3 chars" }),
  endLocation: z.string().max(100),
  startTime: z.coerce.number().min(1).max(7),
  seats: z.coerce.number().min(1).max(3),
});

export type FormState = {
  formData: z.infer<typeof formSchema>;
  errors: ZodIssue[];
};

export const initialState: FormState = {
  formData: {
    startLocation: "",
    endLocation: "",
    startTime: 2,
    seats: 2,
  },
  errors: [],
};
