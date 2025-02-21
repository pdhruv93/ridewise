import { useActionState, useRef, useState } from "react";
import { createCarpool } from "./create-carpool-action";
import { initialState } from "./form-schema";
import { useGoogleMap } from "@react-google-maps/api";

export function useRoute() {
  const startLocationRef = useRef<HTMLInputElement>(null);
  const endLocationRef = useRef<HTMLInputElement>(null);
  const [directions, setDirections] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);
  const map = useGoogleMap();

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
        setDirections(results);
        map?.setOptions({ gestureHandling: "cooperative" });
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
