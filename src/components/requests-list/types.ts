import { type Database } from "@/utils/supabase/database.types";

export type CarpoolRequest =
  Database["public"]["Functions"]["get_requests_from_user"]["Returns"][number];
