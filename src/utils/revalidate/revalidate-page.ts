"use server";

import { revalidatePath } from "next/cache";

export async function revalidateMenuPage(pahtname: string) {
  console.log("Revalidate Menu Page function called !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  
  revalidatePath(`/m/${pahtname}`, "layout");
  revalidatePath(`/m/${pahtname}/en`, "layout");
}

export async function revalidateShopPage(pahtname: string) {
  revalidatePath(`/s/${pahtname}`, "layout");
  revalidatePath(`/s/${pahtname}/en`, "layout");
}
