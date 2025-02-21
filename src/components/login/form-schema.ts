import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email(),
});

export type FormState = {
  formData: z.infer<typeof formSchema>;
  submitted: boolean;
  error: string;
};

export const initialState: FormState = {
  formData: {
    email: "",
  },
  submitted: false,
  error: "",
};
