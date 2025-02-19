"use server";

import { z, type ZodIssue } from "zod";
import { formSchema } from "./formSchema";

type FormState = {
  formData: z.infer<typeof formSchema> | undefined;
  errors: ZodIssue[];
};

export async function createCarpool(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = formSchema.safeParse(formData);

  if (result.error?.errors) {
    return {
      formData: prevState.formData,
      errors: result.error?.errors,
    };
  }

  // TODO: Submit the form

  return {
    formData: prevState.formData,
    errors: [],
  };
}
