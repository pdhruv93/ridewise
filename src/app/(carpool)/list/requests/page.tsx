import { createClient } from "@/utils/supabase/server";
import { VStack, Heading } from "@chakra-ui/react";

export default async function Requests() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.rpc(
    "get_requests_from_user_with_carpool_details",
    {
      user_id: user?.id,
    }
  );

  return <>Requests</>;
}
