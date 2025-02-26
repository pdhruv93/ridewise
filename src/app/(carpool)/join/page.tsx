import { CarpoolsListWithoutRequests } from "@/components/carpools-list/carpools-list-without-requests";
import { createClient } from "@/utils/supabase/server";
import { VStack, Heading } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export default async function Page(props: {
  searchParams?: Promise<{
    startLocation?: string;
    endLocation?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const startLocation = searchParams?.startLocation;
  const endLocation = searchParams?.endLocation;

  if (!startLocation || !endLocation) {
    // TODO: Generate toast notification
    redirect("/");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data } = await supabase.rpc("get_carpools", {
    exclude_user: user.id,
    search_text: "",
  });

  return (
    <VStack
      gap="4"
      maxH="50vh"
      overflowY="scroll"
      scrollbar="hidden"
      scrollBehavior="smooth"
      align="start"
    >
      <VStack align="start" gap="0">
        <Heading fontSize="xl">Here are some carpool options</Heading>
        <Heading fontSize="sm">
          for your journey from {startLocation} to {endLocation}
        </Heading>
      </VStack>

      <CarpoolsListWithoutRequests
        carpoolsWithoutRequests={data}
        requestStartLocation={startLocation}
        requestEndLocation={endLocation}
      />
    </VStack>
  );
}
