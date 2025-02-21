import { z, type ZodIssue } from "zod";
import { placeSchema } from "@/components/maps/types";

export const formSchema = z.object({
  startLocation: placeSchema.nullable(),
  endLocation: placeSchema.nullable(),
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
  errors: ZodIssue[];
};

export const initialState: FormState = {
  formData: {
    startLocation: null,
    endLocation: null,
    pickupSlot: "8-10",
    seats: 2,
    genderPreference: "Any",
  },
  errors: [],
};
