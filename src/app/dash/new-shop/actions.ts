"use server";
import { convertImage } from "@/utils/bunny/image-convert";
import { uploadFileBunny } from "@/utils/bunny/upload-file";
import { SUPPORTED_LANGUAGES } from "@/utils/constants";
import { createServerClient } from "@/utils/supabase/server";
import { nanoid } from "nanoid";
import { permanentRedirect } from "next/navigation";
import { z } from "zod";

export async function createShop(prevState: {message: string}, formData: FormData) {
  const pathname = nanoid();

  const [supported_languages, langsParseError] = validateStringArray(
    JSON.parse(
      //@ts-expect-error runtime error works fine
      formData.get("supported_languages")
    )
  );

  if (
    !supported_languages ||
    supported_languages.length == 0 ||
    langsParseError
  ) {
    return { message: "Επιλέξτε έγκυρες γλώσσες" };
  }

  supported_languages.forEach((e) => {
    if (!SUPPORTED_LANGUAGES.map((e) => e.symbol).includes(e)) {
      return { message: "Επιλέξτε έγκυρες γλώσσες" };
    }
  });

  const menu_names = supported_languages.map((e) => {
    const inputField = formData.get(`name-${e}`);
    if (!inputField) return { message: "Συμπληρώστε όλα τα υποχρεωτικά πεδία" };
    return { text: inputField, locale: e };
  });

  const supabase = await createServerClient();

  const supabaseUser = await supabase.auth.getUser();

  if (supabaseUser.error || !supabaseUser.data.user) {
    return { message: "Δεν έχετε εγγραφεί" };
  }

  const [shopIconId, shopImageId] = await uploadShopImages(formData);

  const { data, error } = await supabase
    .from("shops")
    .insert({
      pathname,
      supported_languages,
      owner: supabaseUser.data.user.id,
      icon: shopIconId,
      shop_image: shopImageId,
    })
    .select();

  if (error || !data[0]) {
    return { message: "Κάτι πήγε λάθος" };
  }

  await supabase.from("shop_names").insert(
    //@ts-expect-error because locale is str but supabase expects el|en
    menu_names.map(({ locale, text }) => ({
      locale,
      text,
      shop: data[0].id,
    }))
  );

  permanentRedirect(`/dash/${pathname}`);
}

const stringArraySchema = z.array(z.string());

function validateStringArray(
  input: JSON
): [string[] | undefined, error: z.ZodError<string[]> | undefined] {
  const result = stringArraySchema.safeParse(input);
  return [result.data, result.error];
}

async function uploadShopImages(formData: FormData) {
  let shopIconName: string | null = null;
  const shopIconFile = formData.get("shop_icon") as File;

  console.log(shopIconFile);

  if (shopIconFile.name != "undefined") {
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

  if (shopImageFile.name != "undefined") {
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
