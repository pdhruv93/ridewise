import {
  Card,
  HStack,
  Icon,
  Stack,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import { MdAccessTime } from "react-icons/md";
import { type Tables } from "@/utils/supabase/database.types";
import { ImLocation, ImLocation2 } from "react-icons/im";
import { BiGroup } from "react-icons/bi";
import { GiPathDistance } from "react-icons/gi";

interface CarpoolDetailsProps {
  carpool: Tables<"carpool">;
}

export default function CarpoolDetails({ carpool }: CarpoolDetailsProps) {
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
          <HStack w="full" align="start" alignItems="center">
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
          </HStack>
        </Card.Title>
      </Card.Header>

      <Card.Body p="0" py="4">
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
      </Card.Body>

      <Card.Footer p="0" py="4">
        <Button size="sm" variant="outline" borderColor="gray.700">
          Preview
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
