import { Button, HStack, Icon, Stack, VStack, Text } from "@chakra-ui/react";
import { type CarpoolWithRequests } from "./types";
import { BiGroup } from "react-icons/bi";
import { GiPathDistance } from "react-icons/gi";
import { ImLocation, ImLocation2 } from "react-icons/im";
import { MdAccessTime } from "react-icons/md";
import NextLink from "next/link";

interface CardpoolWithRequestsProps {
  carpool: CarpoolWithRequests;
}

export function CardpoolWithRequests({ carpool }: CardpoolWithRequestsProps) {
  return (
    <VStack>
      <VStack w="full" align="start">
        <HStack>
          <ImLocation />
          {carpool.start_location}
        </HStack>

        <HStack>
          <ImLocation2 />
          {carpool.end_location}
        </HStack>
      </VStack>

      <Stack gap="4" width="full">
        <HStack gap={{ base: "5", md: "6" }}>
          <HStack>
            <Icon>
              <BiGroup />
            </Icon>
            <Text textStyle="sm" color="fg.muted">
              {carpool.seats}
            </Text>
          </HStack>

          <HStack>
            <Icon>
              <GiPathDistance />
            </Icon>
            <Text textStyle="sm" color="fg.muted">
              {carpool.distance} km
            </Text>
          </HStack>

          <HStack>
            <Icon>
              <MdAccessTime />
            </Icon>
            <Text textStyle="sm" color="fg.muted">
              {carpool.time_min} min
            </Text>
          </HStack>
        </HStack>
      </Stack>

      <Button size="sm" variant="outline" borderColor="gray.700" asChild>
        <NextLink href={`/carpool/${carpool.carpool_id}`}>Preview</NextLink>
      </Button>
    </VStack>
  );
}
