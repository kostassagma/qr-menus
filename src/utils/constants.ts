export const ACCESS_TOKEN_KEY: string = process.env.JWT_SECRET_KEY!;
export const REFRESH_TOKEN_KEY: string = process.env.REFRESH_TOKEN_KEY!;
export const ACCESS_TOKEN_KEY_UINT8 = new Uint8Array(
  new TextEncoder().encode(ACCESS_TOKEN_KEY)
);
export const REFRESH_TOKEN_KEY_UINT8 = new Uint8Array(
  new TextEncoder().encode(REFRESH_TOKEN_KEY)
);

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
export const GOOGLE_SECRET = process.env.GOOGLE_SECRET!;

export const EMAIL_API_KEY = process.env.EMAIL_API_KEY!;

export const SUPPORTED_LANGUAGES = [
  { symbol: "el", label: "Ελληνικά" },
  { symbol: "en", label: "Αγγλικά" },
];

export const HOSTNAME = process.env.NEXT_PUBLIC_HOST!;

export const BUNNY_ACCESS_KEY = process.env.BUNNY_ACCESS_KEY!;
export const BUNNY_STORAGE_API_HOST = "storage.bunnycdn.com";
export const BUNNYCDN_STORAGE_ZONE = process.env.BUNNYCDN_STORAGE_ZONE!;
