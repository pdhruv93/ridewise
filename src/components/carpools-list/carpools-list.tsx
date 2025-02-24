import { type Tables } from "@/utils/supabase/database.types";
import { createClient } from "@/utils/supabase/server";
import { Wrap } from "@chakra-ui/react";
import { CarpoolDetails } from "./details-card";

export default async function CarpoolsListCard(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    return;
  }

  const { data } = await supabase.rpc("get_carpools", {
    logged_in_user_id: user.id,
    search_text: query,
  });

  return (
    <Wrap gap="4" maxH="50vh" overflowY="scroll">
      {(data as Tables<"carpools">[])?.map((carpool, index) => (
        <CarpoolDetails key={`carpool-${index}`} carpool={carpool} />
      ))}
    </Wrap>
  );
}
