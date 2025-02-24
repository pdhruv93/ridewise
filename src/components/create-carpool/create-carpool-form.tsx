"use client";

import { Button, Field, VStack } from "@chakra-ui/react";
import { AutocompleteInput } from "@/components/maps/auto-complete-input";
import { useRoute } from "./useRoute";
import { PreviewRoute } from "@/components/maps/preview-route";

export function CreateCarpoolForm() {
  const {
    startLocationRef,
    endLocationRef,
    createCarPool,
    isPending,
    fieldErrors,
    isRouteGenerated,
    setIsRouteGenerated,
  } = useRoute();

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

        {isRouteGenerated ? (
          <Button
            type="submit"
            variant="solid"
            colorPalette="teal"
            loading={isPending}
            spinnerPlacement="start"
            px="4"
          >
            Submit
          </Button>
        ) : (
          <PreviewRoute
            startLocation={startLocationRef.current?.value}
            endLocation={endLocationRef.current?.value}
            onRouteGenerated={() => setIsRouteGenerated(true)}
          >
            <Button variant="solid" colorPalette="black" px="4">
              Preview
            </Button>
          </PreviewRoute>
        )}
      </VStack>
    </form>
  );
}
