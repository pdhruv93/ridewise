import { type Carpool } from "@/components/carpool-card/types";
import { type CarpoolsWithSplittedRequests } from "./types";

export function groupCarpoolRequests(
  carpoolsWithSplittedRequests: CarpoolsWithSplittedRequests
): Carpool[] {
  const groupedCarpools: Carpool[] = [];

  carpoolsWithSplittedRequests.forEach((carpool) => {
    const carpoolIdAlreadyFormatted = groupedCarpools.some(
      (formattedCarpool) => formattedCarpool.carpool_id === carpool.carpool_id
    );

    if (!carpoolIdAlreadyFormatted) {
      const allCarpoolsWithThisId = carpoolsWithSplittedRequests.filter(
        (uc) => uc.carpool_id === carpool.carpool_id
      );

      groupedCarpools.push({
        ...carpool,
        requests: allCarpoolsWithThisId.map((carpool) => ({
          carpool_id: carpool.carpool_id,
          end_location: carpool.end_location,
          request_id: carpool.req_id,
          request_status: carpool.req_status,
          requested_at: carpool.req_at,
          requested_by: carpool.req_by,
          start_location: carpool.end_location,
          request_end_location: carpool.req_end_location,
          request_start_location: carpool.req_start_location,
        })),
      });
    }
  });

  return groupedCarpools;
}
