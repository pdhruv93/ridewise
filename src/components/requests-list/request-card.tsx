import { Card } from "@chakra-ui/react/card";
import { Heading } from "@chakra-ui/react/typography";
import { Tag } from "@chakra-ui/react/tag";
import { VStack } from "@chakra-ui/react/stack";
import { type CarpoolRequest } from "./types";
import { RouteDetails } from "@/components/route-details/route-details";

interface RequestCardProps {
  request: CarpoolRequest;
  action?: React.ReactNode;
}

export function RequestCard({ request, action }: RequestCardProps) {
  return (
    <Card.Root
      variant="elevated"
      border="xs"
      borderColor="gray.700"
      p="2"
      w="full"
      boxShadow="lg"
    >
      <Card.Header p="0">
        <Card.Title fontSize="sm">
          <VStack w="full" align="start">
            <Tag.Root variant="solid">
              <Tag.Label>
                {(request.status || "Waiting").toUpperCase()}
              </Tag.Label>
            </Tag.Root>

            <VStack align="start" gap="0">
              <Heading fontSize="lg">Carpool route</Heading>

              <RouteDetails
                startLocation={request.start_location}
                endLocation={request.end_location}
              />
            </VStack>

            <VStack align="start" gap="0">
              <Heading fontSize="lg">Your route</Heading>

              <RouteDetails
                startLocation={request.req_start_location}
                endLocation={request.req_end_location}
              />
            </VStack>
          </VStack>
        </Card.Title>
      </Card.Header>

      <Card.Footer p="0" py="4">
        {action}
      </Card.Footer>
    </Card.Root>
  );
}
