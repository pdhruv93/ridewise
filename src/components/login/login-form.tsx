"use client";

import { VStack } from "@chakra-ui/react/stack";
import { Input } from "@chakra-ui/react/input";
import { Field } from "@chakra-ui/react/field";
import { login } from "./login-action";
import { useActionState } from "react";
import { initialState } from "./form-schema";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <form action={formAction}>
      <VStack gap="4" align="flex-start" w="full">
        <Field.Root invalid={!!state.error}>
          <Input
            name="email"
            placeholder="Enter your email to login/signup"
            defaultValue={state.formData.email}
            px="2"
          />
        </Field.Root>

        <Button
          type="submit"
          variant="solid"
          size="xs"
          loading={isPending}
          spinnerPlacement="start"
        >
          Login
        </Button>
      </VStack>
    </form>
  );
}
