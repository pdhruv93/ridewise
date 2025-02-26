import { List, VStack, Text } from "@chakra-ui/react";
import { type Carpool } from "./types";
import { LuCircleCheck, LuCircleDashed } from "react-icons/lu";

interface RequestsListProps {
  requests: Carpool["requests"];
}

export function RequestsList({ requests }: RequestsListProps) {
  return (
    <List.Root gap="2" variant="plain" align="center">
      {requests?.map((request) => (
        <List.Item key={`carpool-request-${request.request_id}`}>
          <List.Indicator asChild color="teal">
            {request.request_status === "approved" ? (
              <LuCircleCheck />
            ) : (
              <LuCircleDashed />
            )}
          </List.Indicator>

          <VStack align="start" gap="0">
            <Text> From: {request.request_start_location}</Text>
            <Text>To: {request.request_end_location}</Text>
          </VStack>
        </List.Item>
      ))}
    </List.Root>
  );
}
