"use server";

import { revalidatePath } from "next/cache";

export async function revalidateMenuPage(pahtname: string) {
  revalidatePath(`/m/${pahtname}`, "page");
  revalidatePath(`/m/${pahtname}/[lang]`, "page");
}

export async function revalidateShopPage(pahtname: string) {
  revalidatePath(`/s/${pahtname}`, "page");
  revalidatePath(`/s/${pahtname}/[lang]`, "page");
}
