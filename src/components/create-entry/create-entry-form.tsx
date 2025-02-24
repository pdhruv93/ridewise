"use client";

import { Field, VStack } from "@chakra-ui/react";
import { AutocompleteInput } from "@/components/maps/auto-complete-input";
import { useRoute } from "./useRoute";
import { ActionButtons } from "./action-buttons";

export function CreateEntryForm() {
  const { startLocationRef, endLocationRef, createCarPool, fieldErrors } =
    useRoute();

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

        <ActionButtons
          startLocation={startLocationRef.current?.value}
          endLocation={endLocationRef.current?.value}
        />
      </VStack>
    </form>
  );
}
