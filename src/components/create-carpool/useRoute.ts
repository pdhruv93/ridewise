import { useActionState, useRef, useState } from "react";
import { createCarpool } from "./create-carpool-action";
import { initialState } from "./form-schema";

export function useRoute() {
  const startLocationRef = useRef<HTMLInputElement>(null);
  const endLocationRef = useRef<HTMLInputElement>(null);
  const [route, setRoute] = useState<google.maps.DirectionsRoute | undefined>(
    undefined
  );

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
      const results = await directionService.route({
        origin: startLocationRef.current?.value,
        destination: endLocationRef.current?.value,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      if (results.routes.length) {
        setRoute(results.routes.at(0));
      }
    }
  };

  return {
    computedRoute: route,
    startLocationRef,
    endLocationRef,
    formAction,
    isPending,
    formState,
    calculateRoute,
    startLocationError,
  };
}
