"use client";

import { Button, Input, VStack, Field } from "@chakra-ui/react";
import { createCarpool } from "./create-carpool-action";
import { useActionState } from "react";
import { initialState } from "./form-schema";
import { AutocompleteInput } from "@/components/maps/auto-complete-input";
import { PickupSlots } from "./pickup-slots";
import { GenderPreference } from "./gender-preference";

export function CreateCarpoolForm() {
  const [state, formAction, isPending] = useActionState(
    createCarpool,
    initialState
  );

  const startLocationError = state.errors.find((error) =>
    error.path.includes("startLocation")
  );

  return (
    <form action={formAction}>
      <VStack gap="6" align="flex-start" w="full">
        <Field.Root invalid={!!startLocationError}>
          <Field.Label>Start location</Field.Label>
          <AutocompleteInput placeholder="Start location" />

          <Field.ErrorText>{startLocationError?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!startLocationError}>
          <Field.Label>End location</Field.Label>
          <AutocompleteInput placeholder="Start location" />

          <Field.ErrorText>{startLocationError?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!startLocationError}>
          <Field.Label>Pickup slot</Field.Label>
          <PickupSlots />

          <Field.HelperText>
            You can discuss flexibility when someone is willing to join this
            carpool
          </Field.HelperText>
          <Field.ErrorText>{startLocationError?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!startLocationError}>
          <Field.Label>Extra seats</Field.Label>
          <Input
            name="seats"
            placeholder="Extra seats"
            defaultValue={state.formData.seats}
            type="number"
            max="3"
            min="1"
            px="2"
          />

          <Field.ErrorText>{startLocationError?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!startLocationError}>
          <Field.Label>Gender Preference</Field.Label>
          <GenderPreference />

          <Field.ErrorText>{startLocationError?.message}</Field.ErrorText>
        </Field.Root>

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
      </VStack>
    </form>
  );
}
