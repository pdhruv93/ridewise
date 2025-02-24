import { redirect } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/utils/supabase/database.types";
import { VStack, Card, HStack, Button, Heading } from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";
import { PreviewRoute } from "@/components/maps/preview-route";

interface CarpoolsListProps {
  startLocation: string;
  endLocation: string;
}

export async function CarpoolsList({
  startLocation,
  endLocation,
}: CarpoolsListProps) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    toaster.create({
      title: "Need to login to access this feature",
      type: "error",
    });

    redirect("/");
  }

  const { data } = await supabase.rpc("get_carpools", {
    logged_in_user_id: user.id,
    search_text: "malmi",
  });

  return (
    <VStack
      gap="4"
      maxH="50vh"
      overflowY="scroll"
      scrollbar="hidden"
      scrollBehavior="smooth"
      align="start"
    >
      <Heading>Preview a carpool</Heading>

      {(data as Tables<"carpools">[])?.map((carpool, index) => (
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
                    (A) {carpool.start_location}
                  </HStack>

                  <HStack>
                    <MdLocationOn />
                    (B) {carpool.end_location}
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

            <Button size="sm" variant="solid" colorPalette="teal">
              Submit Request
            </Button>
          </Card.Footer>
        </Card.Root>
      ))}
    </VStack>
  );
}
