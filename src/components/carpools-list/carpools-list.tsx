import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/utils/supabase/database.types";
import { VStack, Card, HStack, Heading } from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";
import { ActionButtons } from "./action-buttons";

interface CarpoolsListProps {
  startLocation: string;
  endLocation: string;
}

export async function CarpoolsList({
  startLocation,
  endLocation,
}: CarpoolsListProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data } = await supabase.rpc("get_carpools", {
    logged_in_user_id: user.id,
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
      <Heading>Preview a carpool</Heading>

      {(data as Tables<"carpools">[])?.map((carpool, index) =>
        carpool.start_location && carpool.end_location ? (
          <Card.Root
            key={`carpool-${index}`}
            variant="elevated"
            border="xs"
            borderColor="gray.700"
            p="2"
            w="full"
            boxShadow="lg"
          >
            <Card.Header p="0">
              <Card.Title fontSize="sm">
                <HStack w="full" align="start" alignItems="center">
                  <VStack w="full" align="start">
                    <HStack>
                      <MdLocationOn />
                      {carpool.start_location}
                    </HStack>

                    <HStack>
                      <MdLocationOn />
                      {carpool.end_location}
                    </HStack>
                  </VStack>
                </HStack>
              </Card.Title>
            </Card.Header>

            <Card.Footer p="0" py="4">
              <ActionButtons
                carpoolId={carpool.carpool_id}
                carpoolStartLocation={carpool.start_location}
                carpoolEndLocation={carpool.end_location}
                requestStartLocation={startLocation}
                requestEndLocation={endLocation}
              />
            </Card.Footer>
          </Card.Root>
        ) : null
      )}
    </VStack>
  );
}
