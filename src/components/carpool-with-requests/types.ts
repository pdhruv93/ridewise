import { Tables } from "@/utils/supabase/database.types";

export type CarpoolWithRequests = Tables<"carpools"> &
  Tables<"carpool_requests">;
