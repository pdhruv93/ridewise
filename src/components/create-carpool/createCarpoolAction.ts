"use server";

import { formSchema, type FormState, initialState } from "./formSchema";

export async function createCarpool(
  _: FormState,
  newFormData: FormData
): Promise<FormState> {
  const formData: FormState["formData"] = {
    startLocation: newFormData.get("startLocation") as string,
    endLocation: newFormData.get("startLocation") as string,
    seats: Number(newFormData.get("startLocation") as string),
    startTime: Number(newFormData.get("startLocation") as string),
  };

  const result = formSchema.safeParse(formData);

  if (result.error?.errors) {
    return {
      formData,
      errors: result.error?.errors,
    };
  }

  // TODO: Submit the form

  return initialState;
}
