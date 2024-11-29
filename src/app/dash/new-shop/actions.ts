"use server";
import { convertImage } from "@/utils/bunny/image-convert";
import { uploadFileBunny } from "@/utils/bunny/upload-file";
import { SUPPORTED_LANGUAGES } from "@/utils/constants";
import { createServerClient } from "@/utils/supabase/server";
import { nanoid } from "nanoid";
import { z } from "zod";

export async function createShop(formData: FormData) {
  const supported_languages = validateStringArray(
    JSON.parse(
      //@ts-expect-error runtime error works fine
      formData.get("supported_languages")
    )
  );

  supported_languages.forEach((e) => {
    if (!SUPPORTED_LANGUAGES.map((e) => e.symbol).includes(e)) {
      throw new Error("Invalid Lang!");
    }
  });

  const menu_names = supported_languages.map((e) => {
    const inputField = formData.get(`name-${e}`);
    if (!inputField) throw new Error("Missing Name in some langs");
    return { text: inputField, locale: e };
  });

  const [shopIconId, shopImageId] = await uploadShopImages(formData);

  console.log(shopIconId);
  console.log(shopImageId);
  

  // const supabase = await createServerClient();

  // mutate data
  // revalidate cache
}

const stringArraySchema = z.array(z.string());

function validateStringArray(input: any): string[] {
  const result = stringArraySchema.parse(input);
  return result;
}

async function uploadShopImages(formData: FormData) {
  let shopIconName: string | null = null;
  const shopIconFile = formData.get("shop_icon") as File;

  if (shopIconFile) {
    const arrayBuffer = await shopIconFile.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    shopIconName = nanoid();
    uploadFileBunny(
      `images/${shopIconName}.png`,
      await convertImage(buffer, { height: 80, width: 80 })
    );
  }

  let shopImageName: string | null = null;
  const shopImageFile = formData.get("shop_image") as File;

  if (shopImageFile) {
    const arrayBuffer = await shopImageFile.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    shopImageName = nanoid();
    uploadFileBunny(
      `/images/${shopImageName}.png`,
      await convertImage(buffer, { height: 1000, width: 1000 })
    );
  }

  return [shopIconName, shopImageName];
}
