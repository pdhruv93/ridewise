"use server";

import { createClient } from "@/utils/supabase/server";
import { formSchema, type FormState, initialState } from "./form-schema";

export async function createCarpool(
  _test: FormState,
  newFormData: FormData
): Promise<FormState> {
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
    polyline: newFormData.get("polyline") as string,
  };

  const result = formSchema.safeParse(formData);

  if (result.error) {
    return {
      formData,
      submitted: false,
      validationError: result.error.flatten(),
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
    encoded_polyline: formData.polyline,
    seats: formData.seats,
    gender_preference: formData.genderPreference,
    pickup_slot: formData.pickupSlot,
  });

  if (error) {
    return {
      formData,
      submitted: true,
      validationError: undefined,
      errorMessage: error.message,
    };
  }

  return {
    ...initialState,
    submitted: true,
  };
}
