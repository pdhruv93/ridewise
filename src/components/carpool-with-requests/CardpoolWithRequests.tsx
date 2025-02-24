import { Button, HStack, VStack } from "@chakra-ui/react";
import { type CarpoolWithRequests } from "./types";
import { MdLocationOn } from "react-icons/md";
import NextLink from "next/link";

interface CardpoolWithRequestsProps {
  carpool: CarpoolWithRequests;
}

export function CardpoolWithRequests({ carpool }: CardpoolWithRequestsProps) {
  return (
    <VStack>
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

      <Button size="sm" variant="outline" borderColor="gray.700" asChild>
        <NextLink href={`/carpool/${carpool.carpool_id}`}>Preview</NextLink>
      </Button>
    </VStack>
  );
}
