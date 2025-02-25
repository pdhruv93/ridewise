import { useActionState, useEffect } from "react";

import { toaster } from "@/components/ui/toaster";
import { submitRequest } from "./submit-request-action";
import { initialState } from "./form-schema";

export function useSubmitRequest() {
  const [formState, formAction, isPending] = useActionState(
    submitRequest,
    initialState
  );

  useEffect(() => {
    if (formState.submitted) {
      toaster.create({
        title: formState.errorMessage
          ? formState.errorMessage
          : "Carpool requested",
        type: formState.errorMessage ? "error" : "success",
      });
    }
  }, [formState.submitted, formState.errorMessage]);

  return {
    isPending,
    formAction,
  };
}
