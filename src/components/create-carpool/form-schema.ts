import { z } from "zod";

export const formSchema = z.object({
  startLocation: z.string(),
  endLocation: z.string(),
  polyline: z.string(),
});

export type FormState = {
  formData: z.infer<typeof formSchema>;
  submitted: boolean;
  validationError: z.inferFlattenedErrors<typeof formSchema> | undefined;
  errorMessage: string | undefined;
};

export const initialState: FormState = {
  formData: {
    startLocation: "",
    endLocation: "",
    polyline: "",
  },
  submitted: false,
  validationError: undefined,
  errorMessage: undefined,
};
