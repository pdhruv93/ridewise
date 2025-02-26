import { CarpoolCard } from "@/components/carpool-card/carpool-card";
import { groupCarpoolRequests } from "@/components/manage-own-carpools/utils";
import { createClient } from "@/utils/supabase/server";
import { Heading } from "@chakra-ui/react";

export default async function MyCarpools() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.rpc("get_carpool_with_requests_for_user", {
    user_id: user?.id,
  });
  const carpools = groupCarpoolRequests(data);

  return (
    <>
      <Heading fontSize="xl">Carpools created by you</Heading>

      {carpools.map((carpool) => (
        <CarpoolCard key={`carpool-${carpool.carpool_id}`} carpool={carpool} />
      ))}
    </>
  );
}
