import { type Tables, type Database } from "@/utils/supabase/database.types";

export type CarpoolWithoutRequests = Tables<"carpools">;

export type CarpoolWithRequests =
  Database["public"]["Functions"]["get_carpool_with_requests_for_user"]["Returns"];
