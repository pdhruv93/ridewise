"use server";

import { createClient } from "@/utils/supabase/server";
import { formSchema, initialState, type FormState } from "./form-schema";
import { generateToast } from "../toaster/generate-toast";

export async function login(
  _: unknown,
  newFormData: FormData
): Promise<FormState> {
  const formData: FormState["formData"] = {
    email: newFormData.get("email") as string,
  };

  const result = formSchema.safeParse(formData);

  if (result.error?.errors) {
    return {
      formData,
      error: "Invalid email",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp(formData);

  if (error) {
    return generateToast("error", "login", error.message, "/login");
  }

  generateToast(
    "success",
    "login",
    "Use the link sent to the mail to login",
    "/login"
  );

  return initialState;
}
