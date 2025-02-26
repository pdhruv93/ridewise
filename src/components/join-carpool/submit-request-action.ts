"use server";

import { createClient } from "@/utils/supabase/server";
import { type FormState, initialState } from "./form-schema";

export async function submitRequest(
  _test: FormState,
  newFormData: FormData
): Promise<FormState> {
  const formData: FormState["formData"] = {
    carpoolId: newFormData.get("carpoolId") as string,
    requestStartLocation: newFormData.get("requestStartLocation") as string,
    requestEndLocation: newFormData.get("requestEndLocation") as string,
  };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("carpool_requests").insert({
    requested_by: user?.id,
    carpool_id: formData.carpoolId,
    start_location: formData.requestStartLocation,
    end_location: formData.requestEndLocation,
  });

  if (error) {
    return {
      formData,
      submitted: true,
      errorMessage: error.message,
    };
  }

  return {
    ...initialState,
    submitted: true,
  };
}
