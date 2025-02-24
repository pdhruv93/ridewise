import { useActionState, useEffect, useState } from "react";
import { toaster } from "@/components/ui/toaster";
import { createCarpool } from "./create-carpool-action";
import { initialState } from "./form-schema";

export function useRoute() {
  const [isRouteGenerated, setIsRouteGenerated] = useState(false);

  const [formState, createCarPool, isPending] = useActionState(
    createCarpool,
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
    isPending,
    isRouteGenerated,
    setIsRouteGenerated,
    fieldErrors: formState.validationError?.fieldErrors,
    createCarPool,
  };
}
