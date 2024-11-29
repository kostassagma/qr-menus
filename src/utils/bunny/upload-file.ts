// lib/storage.ts
import "server-only";
import {
  BUNNY_ACCESS_KEY,
  BUNNY_STORAGE_API_HOST,
  BUNNYCDN_STORAGE_ZONE,
} from "../constants";

export const uploadFileBunny = async (path: string, file: Uint8Array) => {
  const uploadFileUrl = new URL(
    `/${BUNNYCDN_STORAGE_ZONE}/${path}`,
    `https://${BUNNY_STORAGE_API_HOST}`
  );

  const res = await fetch(uploadFileUrl, {
    method: "PUT",
    //@ts-ignore
    headers: {
      AccessKey: BUNNY_ACCESS_KEY,
      "Content-Type": "application/octet-stream",
    },
    body: file,
  });

  if (!res.ok) throw new Error("Something went wrong!");
};
