"use server";

import { createClient } from "@/utils/supabase/server";
import { generateToast } from "@/components/toaster/generate-toast";

export async function submitRequest(
  carpoolId: string,
  requestStartLocation: string,
  requestEndLocation: string
): Promise<unknown> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const redirectPath = `/list/available_carpools?startLocation=${encodeURIComponent(
    requestStartLocation
  )}&endLocation=${encodeURIComponent(requestEndLocation)}`;

  const { error } = await supabase.from("carpool_requests").insert({
    requested_by: user?.id,
    carpool_id: carpoolId,
    start_location: requestStartLocation,
    end_location: requestEndLocation,
  });

  if (error) {
    return generateToast(
      "error",
      "join-carpool",
      "This is error",
      redirectPath
    );
  }

  return generateToast("error", "join-carpool", "This is error", redirectPath);
}
