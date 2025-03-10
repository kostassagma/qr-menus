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
      categories: {
        Row: {
          category_order: number
          id: number
          menu: number
        }
        Insert: {
          category_order: number
          id?: number
          menu: number
        }
        Update: {
          category_order?: number
          id?: number
          menu?: number
        }
        Relationships: [
          {
            foreignKeyName: "categories_menu_fkey"
            columns: ["menu"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
        ]
      }
      category_name: {
        Row: {
          category: number
          id: number
          locale: Database["public"]["Enums"]["locale"]
          text: string
        }
        Insert: {
          category: number
          id?: number
          locale: Database["public"]["Enums"]["locale"]
          text: string
        }
        Update: {
          category?: number
          id?: number
          locale?: Database["public"]["Enums"]["locale"]
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_name_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          available: boolean
          category: number
          id: number
          image: string | null
          item_order: number
          price: string
        }
        Insert: {
          available?: boolean
          category: number
          id?: number
          image?: string | null
          item_order: number
          price: string
        }
        Update: {
          available?: boolean
          category?: number
          id?: number
          image?: string | null
          item_order?: number
          price?: string
        }
        Relationships: [
          {
            foreignKeyName: "Items_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      items_description: {
        Row: {
          id: number
          item: number
          locale: Database["public"]["Enums"]["locale"]
          text: string
        }
        Insert: {
          id?: number
          item: number
          locale: Database["public"]["Enums"]["locale"]
          text: string
        }
        Update: {
          id?: number
          item?: number
          locale?: Database["public"]["Enums"]["locale"]
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "items_description_item_fkey"
            columns: ["item"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      items_name: {
        Row: {
          id: number
          item: number
          locale: Database["public"]["Enums"]["locale"]
          text: string
        }
        Insert: {
          id?: number
          item: number
          locale: Database["public"]["Enums"]["locale"]
          text: string
        }
        Update: {
          id?: number
          item?: number
          locale?: Database["public"]["Enums"]["locale"]
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "items_name_item_fkey"
            columns: ["item"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_description: {
        Row: {
          id: number
          locale: Database["public"]["Enums"]["locale"]
          menu: number | null
          text: string
        }
        Insert: {
          id?: number
          locale: Database["public"]["Enums"]["locale"]
          menu?: number | null
          text: string
        }
        Update: {
          id?: number
          locale?: Database["public"]["Enums"]["locale"]
          menu?: number | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "menu_description_menu_fkey"
            columns: ["menu"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_names: {
        Row: {
          id: number
          locale: Database["public"]["Enums"]["locale"]
          menu: number | null
          text: string
        }
        Insert: {
          id?: number
          locale: Database["public"]["Enums"]["locale"]
          menu?: number | null
          text: string
        }
        Update: {
          id?: number
          locale?: Database["public"]["Enums"]["locale"]
          menu?: number | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "menu_names_menu_fkey"
            columns: ["menu"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
        ]
      }
      menus: {
        Row: {
          id: number
          pathname: string
          shop: number
        }
        Insert: {
          id?: number
          pathname: string
          shop: number
        }
        Update: {
          id?: number
          pathname?: string
          shop?: number
        }
        Relationships: [
          {
            foreignKeyName: "menus_shop_fkey"
            columns: ["shop"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          id: number
          role: Database["public"]["Enums"]["role"] | null
          shop: number | null
          user: string | null
        }
        Insert: {
          id?: number
          role?: Database["public"]["Enums"]["role"] | null
          shop?: number | null
          user?: string | null
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["role"] | null
          shop?: number | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "roles_shop_fkey"
            columns: ["shop"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shop_descriptions: {
        Row: {
          id: number
          locale: Database["public"]["Enums"]["locale"]
          shop: number
          text: string
        }
        Insert: {
          id?: number
          locale: Database["public"]["Enums"]["locale"]
          shop: number
          text: string
        }
        Update: {
          id?: number
          locale?: Database["public"]["Enums"]["locale"]
          shop?: number
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "shop_descriptions_shop_fkey"
            columns: ["shop"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shop_names: {
        Row: {
          id: number
          locale: Database["public"]["Enums"]["locale"]
          shop: number | null
          text: string
        }
        Insert: {
          id?: number
          locale: Database["public"]["Enums"]["locale"]
          shop?: number | null
          text: string
        }
        Update: {
          id?: number
          locale?: Database["public"]["Enums"]["locale"]
          shop?: number | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "shop_names_shop_fkey"
            columns: ["shop"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shops: {
        Row: {
          icon: string | null
          id: number
          owner: string
          pathname: string
          shop_image: string | null
          supported_languages: Json
        }
        Insert: {
          icon?: string | null
          id?: number
          owner: string
          pathname: string
          shop_image?: string | null
          supported_languages: Json
        }
        Update: {
          icon?: string | null
          id?: number
          owner?: string
          pathname?: string
          shop_image?: string | null
          supported_languages?: Json
        }
        Relationships: []
      }
      stripe_subscriptions: {
        Row: {
          created_at: string
          id: number
          stripe_customer_id: string
          subscription: number
        }
        Insert: {
          created_at?: string
          id?: number
          stripe_customer_id: string
          subscription: number
        }
        Update: {
          created_at?: string
          id?: number
          stripe_customer_id?: string
          subscription?: number
        }
        Relationships: [
          {
            foreignKeyName: "stripe_subscriptions_subscription_fkey"
            columns: ["subscription"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          form: string
          id: number
          shop_id: number
          status: string
        }
        Insert: {
          created_at?: string
          form: string
          id?: number
          shop_id: number
          status: string
        }
        Update: {
          created_at?: string
          form?: string
          id?: number
          shop_id?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      locale: "en" | "gr" | "el"
      role: "owner" | "admin" | "employee"
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
