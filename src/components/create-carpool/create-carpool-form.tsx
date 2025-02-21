"use client";

import { Button, VStack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { createCarpool } from "./create-carpool-action";
import { useActionState } from "react";
import { initialState } from "./form-schema";
import { AutocompleteInput } from "@/components/maps/auto-complete-input";

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
      <VStack gap="4" align="flex-start" w="full">
        <Field
          label="Start point"
          invalid={!!startLocationError}
          errorText={startLocationError?.message}
          w="full"
        >
          <AutocompleteInput />
        </Field>

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
