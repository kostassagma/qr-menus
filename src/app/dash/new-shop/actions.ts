"use server";
import { createServerClient, createServerSuperuser } from "@/utils/supabase/server";
import { z } from "zod";

// ShopNameType in zod
const shopNameSchema = z.object({
  locale: z.string().min(2, "Locale should have at least 2 characters"),
  text: z.string().min(1, "Shop name text cannot be empty"),
});

// NewShopStateType in zod
const newShopStateSchema = z.object({
  supported_languages: z.array(
    z.string().min(2, "Language code should have at least 2 characters")
  ),
  shop_name: z.array(shopNameSchema),
  pathname: z.string().url("Pathname should be a valid URL"),
  icon: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.type.startsWith("image/")),
  shop_image: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.type.startsWith("image/")),
});

type NewShopStateType = z.infer<typeof newShopStateSchema>;

export async function createShop(formData: FormData) {
  const supabase = await createServerSuperuser();

  // await supabase.

  return "";
}
