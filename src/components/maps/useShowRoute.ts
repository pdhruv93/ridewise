import { toaster } from "@/components/ui/toaster";
import { useGoogleMap } from "@react-google-maps/api";
import { useState } from "react";

export function useShowRoute() {
  const map = useGoogleMap();
  const [areRoutesGenerated, setAreRoutesGenerated] = useState(false);

  const showInfoWindow = (
    results: google.maps.DirectionsResult,
    title?: string
  ) => {
    const totalDistance = results.routes[0].legs.reduce(
      (acc, cv) => acc + (cv.distance?.value ?? 0),
      0
    );
    const totalTime = results.routes[0].legs.reduce(
      (acc, cv) => acc + (cv.duration?.value ?? 0),
      0
    );

    // calculate mid point on route
    const midLeg = Math.floor(results.routes[0].legs.length / 2);
    const midPointOnRoute = Math.floor(
      results.routes[0].legs[midLeg].steps.length / 2
    );
    const midPoint =
      results.routes[0].legs[midLeg].steps[midPointOnRoute].end_location;

    const infowindow = new google.maps.InfoWindow();

    infowindow.setContent(
      "<span style='color:black;'>" +
        "<text style='font-weight:bold;'>" +
        title +
        "</text>" +
        "<br>" +
        Math.floor(totalDistance / 1000) +
        " km" +
        "<br>" +
        Math.floor(totalTime / 60) +
        " min" +
        "</span>"
    );

    infowindow.setPosition(midPoint);
    infowindow.setOptions({ headerDisabled: true });
    infowindow.open(map);
  };

  const showRoute = async (
    startLocation: string | null | undefined,
    endLocation: string | null | undefined,
    waypoints?: google.maps.DirectionsWaypoint[]
  ) => {
    if (!startLocation || !endLocation) {
      return;
    }

    const directionService = new google.maps.DirectionsService();
    const originalRouteRenderer = new google.maps.DirectionsRenderer();
    const withWaypointsRouteRenderer = new google.maps.DirectionsRenderer({
      polylineOptions: { strokeColor: "#000000" },
      suppressInfoWindows: false,
    });

    originalRouteRenderer.setMap(map);
    withWaypointsRouteRenderer.setMap(map);

    try {
      const results = await directionService.route({
        origin: startLocation,
        destination: endLocation,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
      });

      if (results.routes.length) {
        originalRouteRenderer.setDirections(results);
        showInfoWindow(results, "Original route");
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
          withWaypointsRouteRenderer.setDirections(results);
          showInfoWindow(results, "Route with stops");
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
