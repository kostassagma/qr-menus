"use server";

import { revalidatePath } from "next/cache";

export async function revalidateMenuPage(pathname: string) {
  "use server";
  console.log(
    "Revalidate Menu Page function called !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  );
  console.log(pathname);
  

  revalidatePath(`/m/${pathname}`, "layout");
}

export async function revalidateShopPage(pahtname: string) {
  revalidatePath(`/s/${pahtname}`, "layout");
  revalidatePath(`/s/${pahtname}/en`, "layout");
}
