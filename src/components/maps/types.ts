import { z } from "zod";

export const placeSchema = z.object({
  placeId: z.string(),
  placeName: z.string(),
  fullAddress: z.string(),
  vicinity: z.string(),
  geometry: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

export type Place = z.infer<typeof placeSchema>;
