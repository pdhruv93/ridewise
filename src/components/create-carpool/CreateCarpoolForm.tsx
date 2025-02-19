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

const places = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});

export function CreateCarpoolForm() {
  const [state, formAction, isPending] = useActionState(createCarpool, {
    formData: undefined,
    errors: [],
  });

  console.log(state);

  const startPointError = state.errors.find((error) =>
    error.path.includes("startPoint")
  );

  console.log(state, isPending);

  return (
    <form action={formAction}>
      <VStack gap="4" align="flex-start" w="full">
        <Field
          label="Start point"
          invalid={!!startPointError}
          errorText={startPointError?.message}
          w="full"
        >
          <SelectRoot variant="subtle" collection={places}>
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

        <Field
          label="End Point"
          invalid={!!startPointError}
          errorText={startPointError?.message}
          w="full"
        >
          <SelectRoot variant="subtle" collection={places}>
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
