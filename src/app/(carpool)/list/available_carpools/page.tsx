import { CarpoolCard } from "@/components/carpool-card/carpool-card";
import { type Carpool } from "@/components/carpool-card/types";
import { ActionButtons } from "@/components/join-carpool/action-buttons";
import { createClient } from "@/utils/supabase/server";
import { VStack, Heading } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export default async function JoinCarpool(props: {
  searchParams?: Promise<{
    startLocation?: string;
    endLocation?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const requestStartLocation = searchParams?.startLocation;
  const requestEndLocation = searchParams?.endLocation;

  if (!requestStartLocation || !requestEndLocation) {
    // TODO: Generate toast notification
    redirect("/");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.rpc("search_carpools_exclude_user", {
    exclude_user: user?.id,
    search_text: "",
  });

  return (
    <>
      <VStack align="start" gap="0">
        <Heading fontSize="xl">Here are some carpool options</Heading>
        <Heading fontSize="sm">
          for your journey from {requestStartLocation} to {requestEndLocation}
        </Heading>
      </VStack>

      {(data as Carpool[]).map((carpool) => (
        <CarpoolCard
          key={`carpool-${carpool.carpool_id}`}
          carpool={carpool}
          action={
            <ActionButtons
              carpoolId={carpool.carpool_id}
              carpoolStartLocation={carpool.start_location}
              carpoolEndLocation={carpool.end_location}
              requestStartLocation={requestStartLocation}
              requestEndLocation={requestEndLocation}
            />
          }
        />
      ))}
    </>
  );
}
