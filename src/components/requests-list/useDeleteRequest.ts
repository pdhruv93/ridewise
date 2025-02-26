import { useActionState, useEffect } from "react";

import { toaster } from "@/components/ui/toaster";
import { deleteRequest } from "./delete-request-action";
import { initialState } from "./form-schema";

export function useDeleteRequest() {
  const [formState, formAction, isPending] = useActionState(
    deleteRequest,
    initialState
  );

  useEffect(() => {
    if (formState.submitted) {
      toaster.create({
        title: formState.errorMessage
          ? formState.errorMessage
          : "Carpool request deleted",
        type: formState.errorMessage ? "error" : "success",
      });
    }
  }, [formState.submitted, formState.errorMessage]);

  return {
    isPending,
    formAction,
  };
}
