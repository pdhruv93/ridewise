"use server";

import { createClient } from "@/utils/supabase/server";
import { type FormState, initialState } from "./form-schema";

export async function deleteRequest(
  _test: FormState,
  newFormData: FormData
): Promise<FormState> {
  const formData: FormState["formData"] = {
    requestId: newFormData.get("requestId") as string,
  };

  const supabase = await createClient();

  const { error } = await supabase
    .from("carpool_requests")
    .delete()
    .eq("request_id", formData.requestId);

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
