import { useActionState, useRef, useState } from "react";
import { createCarpool } from "./create-carpool-action";
import { initialState } from "./form-schema";
import { toaster } from "@/components/ui/toaster";

export function useRoute() {
  const startLocationRef = useRef<HTMLInputElement>(null);
  const endLocationRef = useRef<HTMLInputElement>(null);
  const [directions, setDirections] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);

  const [formState, formAction, isPending] = useActionState(
    createCarpool,
    initialState
  );

  const startLocationError = formState.errors.find((error) =>
    error.path.includes("startLocation")
  );

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
          setDirections(results);
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
    computedDirections: directions,
    startLocationRef,
    endLocationRef,
    formAction,
    isPending,
    formState,
    calculateRoute,
    startLocationError,
  };
}
