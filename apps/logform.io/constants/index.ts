const APP_DOMAIN =
  process.env.NEXT_PUBLIC_ENV === "local"
    ? "http://localhost:4400"
    : "https://app.logform.io";

const HOME_DOMAIN =
  process.env.NEXT_PUBLIC_ENV === "local"
    ? "http://localhost:3300"
    : "https://logform.io";

export { APP_DOMAIN, HOME_DOMAIN };
