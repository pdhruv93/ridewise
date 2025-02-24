"use server";

import { createClient } from "@/utils/supabase/server";
import { formSchema, type FormState, initialState } from "./form-schema";

export async function createCarpool(
  _test: FormState,
  newFormData: FormData,
  polyline?: string
): Promise<FormState> {
  const formData: FormState["formData"] = {
    startLocation: newFormData.get("startLocation") as string,
    endLocation: newFormData.get("endLocation") as string,
    polyline: newFormData.get("polyline") as string,
  };

  const result = formSchema.safeParse(formData);

  if (result.error) {
    return {
      ...initialState,
      formData,
      validationError: result.error.flatten(),
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("carpools").insert({
    created_by: user?.id,
    start_location: formData.startLocation,
    end_location: formData.endLocation,
    encoded_polyline: polyline,
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
