import { ActionButtons } from "@/components/requests-list/action-buttons";
import { RequestCard } from "@/components/requests-list/request-card";
import { type CarpoolRequest } from "@/components/requests-list/types";
import { createClient } from "@/utils/supabase/server";
import { Heading } from "@chakra-ui/react/typography";

export default async function Requests() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.rpc("get_requests_from_user", {
    user_id: user?.id,
  });

  return (
    <>
      <Heading fontSize="xl">Your requests</Heading>

      {(data as CarpoolRequest[]).map((request) => (
        <RequestCard
          key={`carpool-request-${request.req_id}`}
          request={request}
          action={
            <ActionButtons
              requestId={request.req_id}
              carpoolStartLocation={request.start_location}
              carpoolEndLocation={request.end_location}
              requestStartLocation={request.req_start_location}
              requestEndLocation={request.end_location}
            />
          }
        />
      ))}
    </>
  );
}
