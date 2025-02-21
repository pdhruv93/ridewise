import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email(),
});

export type FormState = {
  formData: z.infer<typeof formSchema>;
  error: string;
};

export const initialState: FormState = {
  formData: {
    email: "",
  },
  error: "",
};
