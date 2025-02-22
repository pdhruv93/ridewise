import { z, type ZodError } from "zod";

export const formSchema = z.object({
  startLocation: z.string(),
  endLocation: z.string(),
  pickupSlot: z.enum([
    "6-8",
    "8-10",
    "10-13",
    "13-16",
    "16-18",
    "18-20",
    "20-6",
  ]),
  seats: z.coerce.number().min(1).max(3),
  genderPreference: z.enum(["Male", "Female", "Any"]),
});

export type FormState = {
  formData: z.infer<typeof formSchema>;
  submitted: boolean;
  validationError: ZodError | undefined;
  errorMessage: string | undefined;
};

export const initialState: FormState = {
  formData: {
    startLocation: "",
    endLocation: "",
    pickupSlot: "8-10",
    seats: 2,
    genderPreference: "Any",
  },
  submitted: false,
  validationError: undefined,
  errorMessage: undefined,
};
