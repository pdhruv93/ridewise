"use client";

import { VStack, Input, Button, FieldHelperText } from "@chakra-ui/react";
import { login } from "./login-action";
import { Field } from "@/components/ui/field";
import { useActionState, useEffect } from "react";
import { initialState } from "./form-schema";
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
        <Field invalid={!!state.error} errorText={state.error} w="full">
          <Input
            name="email"
            placeholder="Enter your email to login/signup"
            defaultValue={state.formData.email}
            px="2"
          />
          <FieldHelperText>
            Use the link sent to the mail to login
          </FieldHelperText>
        </Field>

        <Button
          type="submit"
          variant="solid"
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
