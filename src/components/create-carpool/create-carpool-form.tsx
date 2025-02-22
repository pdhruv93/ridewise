"use client";

import { Button, Input, VStack, Field, ButtonGroup } from "@chakra-ui/react";
import { AutocompleteInput } from "@/components/maps/auto-complete-input";
import { PickupSlots } from "./pickup-slots-select";
import { GenderPreference } from "./gender-preference-select";
import { useRoute } from "./useRoute";
import { DirectionsRenderer } from "@react-google-maps/api";
import { Tooltip } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { toaster } from "@/components/ui/toaster";

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
  const fieldErrors = formState.validationError?.flatten().fieldErrors;

  useEffect(() => {
    if (formState.submitted && formState.errorMessage) {
      toaster.create({
        title: formState.errorMessage,
        type: "error",
      });
    }
  }, [formState.submitted, formState.errorMessage]);

  return (
    <>
      <form action={formAction}>
        <VStack gap="6" align="flex-start" w="full">
          <Field.Root invalid={!!fieldErrors?.["startLocation"]}>
            <Field.Label>Start location (A)</Field.Label>
            <AutocompleteInput
              placeholder="Start location"
              ref={startLocationRef}
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

          <ButtonGroup gap="4">
            <Button px="4" onClick={calculateRoute}>
              Preview
            </Button>

            <Tooltip
              content="No routes found. Did you preview yet?"
              disabled={!!computedDirections}
            >
              <Button
                type="submit"
                variant="solid"
                colorPalette="teal"
                loading={isPending}
                spinnerPlacement="start"
                px="4"
                disabled={!computedDirections}
              >
                Submit
              </Button>
            </Tooltip>
          </ButtonGroup>
        </VStack>
      </form>

      {computedDirections ? (
        <DirectionsRenderer directions={computedDirections} />
      ) : null}
    </>
  );
}
