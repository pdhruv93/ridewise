import { CreateCarpoolForm } from "@/components/create-carpool/create-carpool-form";
import { Card } from "@chakra-ui/react";

export default function AddCarPool() {
  return (
    <Card.Root w="md">
      <Card.Body p="6">
        <CreateCarpoolForm />
      </Card.Body>
    </Card.Root>
  );
}
