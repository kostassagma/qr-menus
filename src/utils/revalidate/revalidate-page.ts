"use server";

import { revalidatePath } from "next/cache";
import { SUPPORTED_LANGUAGES } from "../constants";

export async function revalidateMenuPage(pathname: string) {
  "use server";
  console.log(
    "Revalidate Menu Page function called !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  );

  // revalidatePath(`/m/${pahtname}`, "layout");
  SUPPORTED_LANGUAGES.forEach(({ symbol }) => {
    revalidatePath(`/m/${pathname}/${symbol}`);
  });
}

export async function revalidateShopPage(pahtname: string) {
  revalidatePath(`/s/${pahtname}`, "layout");
  revalidatePath(`/s/${pahtname}/en`, "layout");
}
