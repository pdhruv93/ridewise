import { type Database } from "@/utils/supabase/database.types";

export type CarpoolsWithSplittedRequests =
  Database["public"]["Functions"]["get_carpool_with_requests_for_user"]["Returns"];
