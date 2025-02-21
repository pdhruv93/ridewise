import { useActionState, useEffect, useRef } from "react";
import { createCarpool } from "./create-carpool-action";
import { initialState } from "./form-schema";

export function useRoute() {
  const startLocationRef = useRef<HTMLInputElement>(null);
  const endLocationRef = useRef<HTMLInputElement>(null);

  const [formState, formAction, isPending] = useActionState(
    createCarpool,
    initialState
  );

  const startLocationError = formState.errors.find((error) =>
    error.path.includes("startLocation")
  );

  const calculateRoute = async () => {
    const directionService = new google.maps.DirectionsService();

    console.log(":::::", startLocationRef.current?.value);

    const results = await directionService.route({
      origin: startLocationRef.current?.value,
      destination: endLocationRef.current?.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    console.log("::::", results);
  };

  return {
    startLocationRef,
    endLocationRef,
    formAction,
    isPending,
    formState,
    calculateRoute,
    startLocationError,
  };
}
