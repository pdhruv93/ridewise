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

  const { data } = await supabase.rpc("get_carpool_with_requests", {
    search_carpool_id: carpoolId,
  });

  return <></>;
}
