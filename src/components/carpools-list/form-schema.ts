import { z } from "zod";

export const formSchema = z.object({
  carpoolId: z.string(),
  requestStartLocation: z.string(),
  requestEndLocation: z.string(),
});

export type FormState = {
  formData: z.infer<typeof formSchema>;
  submitted: boolean;
  errorMessage: string | undefined;
};

export const initialState: FormState = {
  formData: {
    carpoolId: "",
    requestStartLocation: "",
    requestEndLocation: "",
  },
  submitted: false,
  errorMessage: undefined,
};
