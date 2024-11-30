"use server";

import { revalidatePath } from "next/cache";

export async function revalidateMenuPage(pahtname: string) {
  revalidatePath(`/m/${pahtname}`, "page");
  revalidatePath(`/m/${pahtname}/en`, "page");
}

export async function revalidateShopPage(pahtname: string) {
  revalidatePath(`/s/${pahtname}`, "page");
  revalidatePath(`/s/${pahtname}/en`, "page");
}
