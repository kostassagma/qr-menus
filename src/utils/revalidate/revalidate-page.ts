"use server";

import { revalidatePath } from "next/cache";

export async function revalidateMenuPage(pahtname: string) {
  "use server";
  console.log("Revalidate Menu Page function called !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  
  revalidatePath(`/m/${pahtname}`, "layout");
  revalidatePath(`/m/-OsPRIgQEJPP1Tm9ilZ6G/en`, "layout");
  revalidatePath(`/m/-OsPRIgQEJPP1Tm9ilZ6G/en`, "page");
  
}

export async function revalidateShopPage(pahtname: string) {
  revalidatePath(`/s/${pahtname}`, "layout");
  revalidatePath(`/s/${pahtname}/en`, "layout");
}
