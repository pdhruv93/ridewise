"use client";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { Button, createListCollection, VStack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { createCarpool } from "./createCarpoolAction";
import { useActionState } from "react";
import { initialState } from "./formSchema";

const places = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});

export function CreateCarpoolForm() {
  const [state, formAction, isPending] = useActionState(
    createCarpool,
    initialState
  );

  const startLocationError = state.errors.find((error) =>
    error.path.includes("startLocation")
  );

  if (isPending) {
    return <>Loading...</>;
  }

  console.log(":::Client", state.formData);

  return (
    <form action={formAction}>
      <VStack gap="4" align="flex-start" w="full">
        <Field
          label="Start point"
          invalid={!!startLocationError}
          errorText={startLocationError?.message}
          w="full"
        >
          <SelectRoot
            name="startLocation"
            variant="subtle"
            collection={places}
            defaultValue={[state.formData.startLocation]}
          >
            <SelectTrigger>
              <SelectValueText placeholder="Select start point" />
            </SelectTrigger>

            <SelectContent>
              {places.items.map((movie) => (
                <SelectItem item={movie} key={movie.value}>
                  {movie.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Field>

        <Button type="submit">Submit</Button>
      </VStack>
    </form>
  );
}
