import { z } from "zod";

export const formSchema = z.object({
  requestId: z.string(),
});

export type FormState = {
  formData: z.infer<typeof formSchema>;
  submitted: boolean;
  errorMessage: string | undefined;
};

export const initialState: FormState = {
  formData: {
    requestId: "",
  },
  submitted: false,
  errorMessage: undefined,
};
