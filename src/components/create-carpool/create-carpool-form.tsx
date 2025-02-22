"use client";

import { Button, Input, VStack, Field } from "@chakra-ui/react";
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
    formState,
    formAction,
    calculateRoute,
    isPending,
  } = useRoute();
  const fieldErrors = formState.validationError?.fieldErrors;

  console.log("::::", computedDirections);

  return (
    <>
      <form action={formAction}>
        <VStack gap="6" align="flex-start" w="full">
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

            <Field.ErrorText>
              {fieldErrors?.["endLocation"]?.[0]}
            </Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!fieldErrors?.["pickupSlot"]}>
            <Field.Label>Pickup slot</Field.Label>
            <PickupSlots defaultValue={[formState.formData.pickupSlot]} />

            <Field.HelperText>
              You can discuss flexibility when someone is willing to join this
              carpool
            </Field.HelperText>

            <Field.ErrorText>
              {fieldErrors?.["pickupSlot"]?.[0]}
            </Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!fieldErrors?.["seats"]}>
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

            <Field.ErrorText>{fieldErrors?.["seats"]?.[0]}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!fieldErrors?.["genderPreference"]}>
            <Field.Label>Gender Preference</Field.Label>
            <GenderPreference
              defaultValue={[formState.formData.genderPreference]}
            />

            <Field.ErrorText>
              {fieldErrors?.["genderPreference"]?.[0]}
            </Field.ErrorText>
          </Field.Root>

          <Button
            type={computedDirections ? "submit" : "button"}
            variant="solid"
            colorPalette={computedDirections ? "teal" : "black"}
            loading={isPending}
            spinnerPlacement="start"
            px="4"
            onClick={computedDirections ? undefined : calculateRoute}
          >
            {computedDirections ? "Submit" : "Preview"}
          </Button>
        </VStack>
      </form>

      {computedDirections ? (
        <DirectionsRenderer directions={computedDirections} />
      ) : null}
    </>
  );
}
