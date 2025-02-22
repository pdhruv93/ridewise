"use client";

import { Card } from "@chakra-ui/react";
import { CreateCarpoolForm } from "./create-carpool-form";
import { DirectionsRenderer } from "@react-google-maps/api";
import { useState } from "react";

export function CreateCarpoolCard() {
  const [directions, setDirections] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);

  return (
    <Card.Root w="sm">
      <Card.Body p="4">
        <CreateCarpoolForm />

        <DirectionsRenderer directions={directions} />
      </Card.Body>
    </Card.Root>
  );
}
