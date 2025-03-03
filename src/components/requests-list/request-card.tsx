import { Card } from "@chakra-ui/react/card";
import { Heading, Text } from "@chakra-ui/react/typography";
import { Tag } from "@chakra-ui/react/tag";
import { HStack, VStack } from "@chakra-ui/react/stack";
import { MdArrowForward } from "react-icons/md";
import { type CarpoolRequest } from "./types";
import { SimpleGrid } from "@chakra-ui/react/grid";

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

              <SimpleGrid columns={3}>
                <Text>{request.start_location}</Text>
                <MdArrowForward size="30" />
                <Text>{request.end_location}</Text>
              </SimpleGrid>
            </VStack>

            <VStack align="start" gap="0">
              <Heading fontSize="lg">Your route</Heading>

              <HStack w="full">
                <Text>{request.req_start_location}</Text>
                <MdArrowForward size="30" />
                <Text>{request.req_end_location}</Text>
              </HStack>
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
