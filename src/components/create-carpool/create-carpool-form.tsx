"use client";

import { Field, VStack } from "@chakra-ui/react";
import { AutocompleteInput } from "@/components/maps/auto-complete-input";
import { useCreateCarpool } from "./useCreateCarpool";
import { ActionButtons } from "./action-buttons";

export function CreateCarpoolForm() {
  const { startLocationRef, endLocationRef, createCarPool, fieldErrors } =
    useCreateCarpool();

  return (
    <form action={createCarPool} style={{ width: "100%" }}>
      <VStack gap="6" align="start" w="full">
        <Field.Root invalid={!!fieldErrors?.["startLocation"]}>
          <Field.Label>Start location</Field.Label>
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
          <Field.Label>End location</Field.Label>
          <AutocompleteInput
            placeholder="End location"
            ref={endLocationRef}
            name="endLocation"
          />

          <Field.ErrorText>{fieldErrors?.["endLocation"]?.[0]}</Field.ErrorText>
        </Field.Root>

        <ActionButtons
          startLocation={startLocationRef}
          endLocation={endLocationRef}
        />
      </VStack>
    </form>
  );
}
