import { VStack, Card, HStack, Heading } from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";
import { ActionButtons } from "./action-buttons";
import { type CarpoolWithoutRequests } from "./types";

interface CarpoolsListWithoutRequestsProps {
  requestStartLocation: string;
  requestEndLocation: string;
  carpoolsWithoutRequests: CarpoolWithoutRequests[];
}

export async function CarpoolsListWithoutRequests({
  requestStartLocation,
  requestEndLocation,
  carpoolsWithoutRequests,
}: CarpoolsListWithoutRequestsProps) {
  if (!carpoolsWithoutRequests.length) {
    return <Heading fontSize="md">Nothing found :)</Heading>;
  }

  return (
    <>
      {carpoolsWithoutRequests?.map((carpool, index) =>
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
                requestStartLocation={requestStartLocation}
                requestEndLocation={requestEndLocation}
              />
            </Card.Footer>
          </Card.Root>
        ) : null
      )}
    </>
  );
}
