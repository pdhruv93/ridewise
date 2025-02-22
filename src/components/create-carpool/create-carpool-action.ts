"use server";

import { createClient } from "@/utils/supabase/server";
import { formSchema, type FormState, initialState } from "./form-schema";

export async function createCarpool(
  _test: FormState,
  newFormData: FormData
): Promise<FormState> {
  console.log("_test____", _test);
  const formData: FormState["formData"] = {
    startLocation: newFormData.get("startLocation") as string,
    endLocation: newFormData.get("endLocation") as string,
    pickupSlot: newFormData.get(
      "pickupSlot"
    ) as FormState["formData"]["pickupSlot"],
    seats: Number(newFormData.get("seats") as string),
    genderPreference: newFormData.get(
      "genderPreference"
    ) as FormState["formData"]["genderPreference"],
  };

  console.log("::::formData", formData);

  const result = formSchema.safeParse(formData);

  if (result.error?.errors) {
    return {
      formData,
      submitted: false,
      errors: result.error?.errors,
      errorMessage: undefined,
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("carpool").insert({
    created_by: user?.id,
    start_location: formData.startLocation,
    end_location: formData.endLocation,
    encoded_polyline: null,
    seats: formData.seats,
    gender_preference: formData.genderPreference,
    pickup_slot: formData.pickupSlot,
  });

  if (error) {
    return {
      formData,
      submitted: true,
      errors: [],
      errorMessage: error.message,
    };
  }

  return {
    ...initialState,
    submitted: true,
  };
}
