export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      carpool_requests: {
        Row: {
          carpool_id: string | null
          end_location: string | null
          is_waiting: boolean | null
          request_id: string
          requested_at: string
          requested_by: string | null
          start_location: string | null
        }
        Insert: {
          carpool_id?: string | null
          end_location?: string | null
          is_waiting?: boolean | null
          request_id?: string
          requested_at?: string
          requested_by?: string | null
          start_location?: string | null
        }
        Update: {
          carpool_id?: string | null
          end_location?: string | null
          is_waiting?: boolean | null
          request_id?: string
          requested_at?: string
          requested_by?: string | null
          start_location?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "carpool_requests_carpool_id_fkey"
            columns: ["carpool_id"]
            isOneToOne: false
            referencedRelation: "carpools"
            referencedColumns: ["carpool_id"]
          },
        ]
      }
      carpools: {
        Row: {
          carpool_id: string
          created_at: string
          created_by: string | null
          encoded_polyline: string | null
          end_location: string | null
          is_open: boolean | null
          start_location: string | null
        }
        Insert: {
          carpool_id?: string
          created_at?: string
          created_by?: string | null
          encoded_polyline?: string | null
          end_location?: string | null
          is_open?: boolean | null
          start_location?: string | null
        }
        Update: {
          carpool_id?: string
          created_at?: string
          created_by?: string | null
          encoded_polyline?: string | null
          end_location?: string | null
          is_open?: boolean | null
          start_location?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_carpool_with_requests: {
        Args: {
          search_carpool_id: string
        }
        Returns: {
          carpool_id: string
          created_at: string
          created_by: string
          start_location: string
          end_location: string
          encoded_polyline: string
          seats: number
          gender_preference: string
          pickup_slot: string
          distance: number
          time_min: number
          is_fully_booked: boolean
          request_id: string
          requested_at: string
          requested_by: string
          is_waiting: boolean
        }[]
      }
      get_carpools: {
        Args: {
          logged_in_user_id: string
          search_text: string
        }
        Returns: {
          carpool_id: string
          created_at: string
          created_by: string
          start_location: string
          end_location: string
          encoded_polyline: string
          seats: number
          gender_preference: string
          pickup_slot: string
          distance: number
          time_min: number
          is_fully_booked: boolean
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
