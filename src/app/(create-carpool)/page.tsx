import { CreateCarpoolForm } from "@/components/create-carpool/create-carpool-form";
import { Card } from "@chakra-ui/react";

export default function AddCarPool() {
  return (
    <Card.Root w="sm">
      <Card.Body p="4">
        <CreateCarpoolForm />
      </Card.Body>
    </Card.Root>
  );
}
