import { type Tables } from "@/utils/supabase/database.types";

export type Carpool = Tables<"carpools"> & {
  requests?: Tables<"carpool_requests">[];
};
