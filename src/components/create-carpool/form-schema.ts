import { z } from "zod";

export const formSchema = z.object({
  startLocation: z.string(),
  endLocation: z.string(),
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
  },
  submitted: false,
  validationError: undefined,
  errorMessage: undefined,
};
