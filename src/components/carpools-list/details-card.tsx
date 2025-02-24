import { Button, Card, HStack, VStack } from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";
import { type Tables } from "@/utils/supabase/database.types";
import { PreviewRoute } from "@/components/maps/preview-route";

interface CarpoolDetailsProps {
  carpool: Tables<"carpools">;
}

export function CarpoolDetails({ carpool }: CarpoolDetailsProps) {
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
        <PreviewRoute
          startLocation={carpool.start_location}
          endLocation={carpool.end_location}
        >
          <Button size="sm" variant="outline" borderColor="gray.700">
            Preview
          </Button>
        </PreviewRoute>
      </Card.Footer>
    </Card.Root>
  );
}
