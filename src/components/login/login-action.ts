"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { formSchema, type FormState } from "./form-schema";

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
    return {
      formData,
      error: error.message,
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
