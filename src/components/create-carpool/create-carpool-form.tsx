"use client";

import { Button, Input, VStack, Field, ButtonGroup } from "@chakra-ui/react";
import { AutocompleteInput } from "@/components/maps/auto-complete-input";
import { PickupSlots } from "./pickup-slots-select";
import { GenderPreference } from "./gender-preference-select";
import { useRoute } from "./useRoute";
import { DirectionsRenderer } from "@react-google-maps/api";

export function CreateCarpoolForm() {
  const {
    computedDirections,
    startLocationRef,
    endLocationRef,
    formAction,
    isPending,
    formState,
    startLocationError,
    calculateRoute,
  } = useRoute();

  return (
    <>
      <form action={formAction}>
        <VStack gap="6" align="flex-start" w="full">
          <Field.Root invalid={!!startLocationError}>
            <Field.Label>Start location</Field.Label>
            <AutocompleteInput
              placeholder="Start location"
              ref={startLocationRef}
            />

            <Field.ErrorText>{startLocationError?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!startLocationError}>
            <Field.Label>End location</Field.Label>
            <AutocompleteInput
              placeholder="End location"
              ref={endLocationRef}
            />

            <Field.ErrorText>{startLocationError?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!startLocationError}>
            <Field.Label>Pickup slot</Field.Label>
            <PickupSlots defaultValue={[formState.formData.pickupSlot]} />

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
              type="number"
              max="3"
              min="1"
              px="2"
              defaultValue={Number(formState.formData.seats)}
            />

            <Field.ErrorText>{startLocationError?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!startLocationError}>
            <Field.Label>Gender Preference</Field.Label>
            <GenderPreference
              defaultValue={[formState.formData.genderPreference]}
            />

            <Field.ErrorText>{startLocationError?.message}</Field.ErrorText>
          </Field.Root>

          <ButtonGroup gap="4">
            <Button px="4" onClick={calculateRoute}>
              Preview
            </Button>

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
          </ButtonGroup>
        </VStack>
      </form>

      {computedDirections ? (
        <DirectionsRenderer directions={computedDirections} />
      ) : null}
    </>
  );
}
