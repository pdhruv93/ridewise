import { Card } from "@chakra-ui/react/card";
import { VStack } from "@chakra-ui/react/stack";
import { Tag } from "@chakra-ui/react/tag";
import { type Carpool } from "./types";
import { RequestsList } from "./requests-list";
import { RouteDetails } from "@/components/route-details/route-details";

interface CarpoolCardProps {
  carpool: Carpool;
  action?: React.ReactNode;
}

export function CarpoolCard({ carpool, action }: CarpoolCardProps) {
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
              <Tag.Label>{carpool.requests?.length ?? 0} requests</Tag.Label>
            </Tag.Root>

            <RouteDetails
              startLocation={carpool.start_location}
              endLocation={carpool.end_location}
            />

            <RequestsList requests={carpool.requests} />
          </VStack>
        </Card.Title>
      </Card.Header>

      <Card.Footer p="0" py="4">
        {action}
      </Card.Footer>
    </Card.Root>
  );
}
