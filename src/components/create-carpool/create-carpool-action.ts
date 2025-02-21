"use server";

import { formSchema, type FormState, initialState } from "./form-schema";

export async function createCarpool(
  _: FormState,
  newFormData: FormData
): Promise<FormState> {
  const formData: FormState["formData"] = {
    startLocation: newFormData.get("startLocation") as string,
    endLocation: newFormData.get("endLocation") as string,
    pickupSlot: newFormData.get(
      "pickupSlot"
    ) as FormState["formData"]["pickupSlot"],
    seats: Number(newFormData.get("startLocation") as string),
    genderPreference: newFormData.get(
      "pickupSlot"
    ) as FormState["formData"]["genderPreference"],
  };

  console.log("::::formData", formData);

  const result = formSchema.safeParse(formData);

  if (result.error?.errors) {
    return {
      formData,
      submitted: false,
      errors: result.error?.errors,
    };
  }

  // TODO: Submit the form to supabase

  return {
    ...initialState,
    submitted: true,
  };
}
