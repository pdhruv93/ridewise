import { ActionButtons } from "@/components/requests-list/action-buttons";
import { RequestCard } from "@/components/requests-list/request-card";
import { type CarpoolRequest } from "@/components/requests-list/types";
import { createClient } from "@/utils/supabase/server";
import { Heading } from "@chakra-ui/react";

export default async function Requests() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.rpc("get_carpool_with_requests_for_user", {
    user_id: user?.id,
  });

  return (
    <>
      <Heading fontSize="xl">Your requests</Heading>

      {(data as CarpoolRequest[]).map((request) => (
        <RequestCard
          key={`carpool-request- ${request.req_id}`}
          request={request}
          action={
            <ActionButtons
              carpoolId={""}
              carpoolStartLocation={null}
              carpoolEndLocation={null}
              requestStartLocation={""}
              requestEndLocation={""}
            />
          }
        />
      ))}
    </>
  );
}
