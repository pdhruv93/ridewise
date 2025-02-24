"use client";

import { Button, Field, VStack } from "@chakra-ui/react";
import { AutocompleteInput } from "@/components/maps/auto-complete-input";
import { useRoute } from "./useRoute";

interface CreateCarpoolFormProps {
  onCarpoolCreated?: (route: google.maps.DirectionsResult) => void;
}

export function CreateCarpoolForm({
  onCarpoolCreated,
}: CreateCarpoolFormProps) {
  const {
    startLocationRef,
    endLocationRef,
    createCarPool,
    calculateRoute,
    isPending,
    isRouteGenerated,
    fieldErrors,
  } = useRoute(onCarpoolCreated);

  return (
    <form action={createCarPool} style={{ width: "100%" }}>
      <VStack gap="6" align="start" w="full">
        <Field.Root invalid={!!fieldErrors?.["startLocation"]}>
          <Field.Label>Start location (A)</Field.Label>
          <AutocompleteInput
            placeholder="Start location"
            ref={startLocationRef}
            name="startLocation"
          />

          <Field.ErrorText>
            {fieldErrors?.["startLocation"]?.[0]}
          </Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!fieldErrors?.["endLocation"]}>
          <Field.Label>End location (B)</Field.Label>
          <AutocompleteInput
            placeholder="End location"
            ref={endLocationRef}
            name="endLocation"
          />

          <Field.ErrorText>{fieldErrors?.["endLocation"]?.[0]}</Field.ErrorText>
        </Field.Root>

        <Button
          type={isRouteGenerated ? "submit" : "button"}
          variant="solid"
          colorPalette={isRouteGenerated ? "teal" : "black"}
          loading={isPending}
          spinnerPlacement="start"
          px="4"
          onClick={isRouteGenerated ? undefined : calculateRoute}
        >
          {isRouteGenerated ? "Submit" : "Preview"}
        </Button>
      </VStack>
    </form>
  );
}
