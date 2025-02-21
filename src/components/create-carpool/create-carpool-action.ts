"use server";

import { type Place } from "@/components/maps/types";
import { formSchema, type FormState, initialState } from "./form-schema";

export async function createCarpool(
  _: FormState,
  newFormData: FormData
): Promise<FormState> {
  console.log("::::", newFormData);

  const formData: FormState["formData"] = {
    startLocation: newFormData.get("startLocation") as Place,
    endLocation: newFormData.get("endLocation") as Place,
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
