import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function Carpool({
  params,
}: {
  params: Promise<{ carpoolId: string }>;
}) {
  const carpoolId = (await params).carpoolId;

  if (!carpoolId) {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    notFound();
  }

  const { data } = await supabase.rpc("get_carpools", {
    logged_in_user_id: user.id,
    search_text: query,
  });

  return <>This is the details page page {carpoolId}</>;
}
