import { createClient } from "@/utils/supabase/server";
import { VStack, Heading } from "@chakra-ui/react";

export default async function MyCarpools() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.rpc(
    "get_carpool_with_request_counts_for_user",
    {
      user_id: user?.id,
    }
  );

  return (
    <VStack
      gap="4"
      maxH="50vh"
      overflowY="scroll"
      scrollbar="hidden"
      scrollBehavior="smooth"
      align="start"
    >
      <Heading fontSize="xl">Carpools created by you</Heading>

      <>My carpools</>
    </VStack>
  );
}
