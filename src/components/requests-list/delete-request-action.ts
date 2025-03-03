"use server";

import { createClient } from "@/utils/supabase/server";
import { generateToast } from "@/components/toaster/generate-toast";
import { revalidatePath } from "next/cache";

export async function deleteRequest(requestId: string): Promise<unknown> {
  const redirectPath = "/list/requests";
  const supabase = await createClient();

  const { error } = await supabase
    .from("carpool_requests")
    .delete()
    .eq("request_id", requestId);

  if (error) {
    return generateToast("error", "join-carpool", error.message, redirectPath);
  }

  generateToast("success", "join-carpool", "Request deleted", redirectPath);
  revalidatePath(redirectPath);
}
