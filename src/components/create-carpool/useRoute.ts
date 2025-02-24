import { useActionState, useEffect, useRef, useState } from "react";

import { toaster } from "@/components/ui/toaster";
import { createCarpool } from "./create-carpool-action";
import { initialState } from "./form-schema";

export function useRoute(
  onCarpoolCreated?: (route: google.maps.DirectionsResult) => void
) {
  const [route, setRoute] = useState<google.maps.DirectionsResult | undefined>(
    undefined
  );
  const startLocationRef = useRef<HTMLInputElement>(null);
  const endLocationRef = useRef<HTMLInputElement>(null);

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

  const calculateRoute = async () => {
    const directionService = new google.maps.DirectionsService();

    if (startLocationRef.current?.value && endLocationRef.current?.value) {
      try {
        const results = await directionService.route({
          origin: startLocationRef.current?.value,
          destination: endLocationRef.current?.value,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: false,
        });

        if (results.routes.length) {
          onCarpoolCreated?.(results);
          setRoute(results);
        }
      } catch {
        toaster.create({
          title: "No route found",
          type: "error",
        });
      }
    }
  };

  return {
    startLocationRef,
    endLocationRef,
    isPending,
    isRouteGenerated: !!route,
    fieldErrors: formState.validationError?.fieldErrors,
    calculateRoute,
    createCarPool,
  };
}
