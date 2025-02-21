"use client";

import { VStack, Input, Button } from "@chakra-ui/react";
import { login } from "./login-action";
import { Field } from "@/components/ui/field";
import { useActionState } from "react";
import { initialState } from "./form-schema";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <form action={formAction}>
      <VStack gap="4" align="flex-start" w="full">
        <Field
          label="Email"
          invalid={!!state.error}
          errorText={state.error}
          w="full"
        >
          <Input
            name="email"
            placeholder="Enter your email"
            defaultValue={state.formData.email}
          />
        </Field>

        <Button
          type="submit"
          variant="outline"
          size="xs"
          loading={isPending}
          spinnerPlacement="start"
          px="4"
        >
          Login
        </Button>
      </VStack>
    </form>
  );
}
