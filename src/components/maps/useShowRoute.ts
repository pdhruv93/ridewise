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
    const midPointOnRoute = Math.floor(
      results.routes[0].legs[0].steps.length / 2
    );

    const infowindow = new google.maps.InfoWindow();

    if (title) {
      infowindow.setHeaderContent(title);
    }

    infowindow.setContent(
      "<span style='color:black;'>" +
        "<text style='font-weight:bold;'>" +
        title +
        "</text>" +
        "<br>" +
        results.routes[0].legs[0].distance?.text +
        "<br>" +
        results.routes[0].legs[0].duration?.text +
        "</span>"
    );

    infowindow.setPosition(
      results.routes[0].legs[0].steps[midPointOnRoute].end_location
    );
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
