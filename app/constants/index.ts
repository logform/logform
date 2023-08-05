const APP_DOMAIN =
  process.env.NEXT_PUBLIC_ENV === "local"
    ? "http://localhost:4400"
    : "https://app-logform.vercel.app";

const HOME_DOMAIN =
  process.env.NEXT_PUBLIC_ENV === "local"
    ? "http://localhost:3300"
    : "https://logform.vercel.app";

export { APP_DOMAIN, HOME_DOMAIN };
