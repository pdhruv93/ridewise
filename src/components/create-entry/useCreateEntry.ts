import { useActionState, useEffect, useRef } from "react";

import { toaster } from "@/components/ui/toaster";
import { createEntry } from "./create-entry-action";
import { initialState } from "./form-schema";

export function useCreateEntry() {
  const startLocationRef = useRef<HTMLInputElement>(null);
  const endLocationRef = useRef<HTMLInputElement>(null);

  const [formState, createCarPool, isPending] = useActionState(
    createEntry,
    initialState
  );

  useEffect(() => {
    if (formState.submitted) {
      toaster.create({
        title: formState.errorMessage
          ? formState.errorMessage
          : "Carpool created",
        type: formState.errorMessage ? "error" : "success",
      });
    }
  }, [formState.submitted, formState.errorMessage]);

  return {
    startLocationRef,
    endLocationRef,
    isPending,
    fieldErrors: formState.validationError?.fieldErrors,
    createCarPool,
  };
}
