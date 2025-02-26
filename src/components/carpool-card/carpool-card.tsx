import { Card, HStack, Tag, VStack } from "@chakra-ui/react";
import { type Carpool } from "./types";
import { MdLocationOn } from "react-icons/md";

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

            <HStack>
              <MdLocationOn />
              {carpool.start_location}
            </HStack>

            <HStack>
              <MdLocationOn />
              {carpool.end_location}
            </HStack>
          </VStack>
        </Card.Title>
      </Card.Header>

      <Card.Footer p="0" py="4">
        {action}
      </Card.Footer>
    </Card.Root>
  );
}
