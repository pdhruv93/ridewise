"use client";

import { VStack } from "@chakra-ui/react/stack";
import { Input } from "@chakra-ui/react/input";
import { Field } from "@chakra-ui/react/field";
import { login } from "./login-action";
import { useActionState, useEffect } from "react";
import { initialState } from "./form-schema";
import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  useEffect(() => {
    if (state.submitted) {
      toaster.create({
        title: "Use the link sent on the mail to login",
        type: "success",
      });
    }
  }, [state.submitted]);

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

          <Field.HelperText>
            Use the link sent to the mail to login
          </Field.HelperText>
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
