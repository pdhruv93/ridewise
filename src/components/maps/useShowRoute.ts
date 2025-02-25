import { toaster } from "@/components/ui/toaster";
import { useState } from "react";

export function useShowRoute() {
  const [areRoutesGenerated, setAreRoutesGenerated] = useState(false);

  const showRoute = async (
    startLocation: string | null | undefined,
    endLocation: string | null | undefined,
    waypoints?: google.maps.DirectionsWaypoint[]
  ) => {
    if (!startLocation || !endLocation) {
      return;
    }

    const directionService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();

    try {
      const results = await directionService.route({
        origin: startLocation,
        destination: endLocation,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
      });

      if (results.routes.length) {
        directionsDisplay.setDirections(results);
      }

      // Show Route with waypoints
      if (waypoints?.length) {
        const results = await directionService.route({
          origin: startLocation,
          destination: endLocation,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: false,
          waypoints,
          optimizeWaypoints: true,
        });

        if (results.routes.length) {
          directionsDisplay.setDirections(results);
        }
      }

      setAreRoutesGenerated(true);
    } catch {
      toaster.create({
        title: "No route found",
        type: "error",
      });
    }
  };

  return { areRoutesGenerated, showRoute };
}
