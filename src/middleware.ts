import createMiddleware from "next-intl/middleware";
import cfg from "./config";
import { withAccessFilter } from "./middleware/access_filter";

export default withAccessFilter(
  createMiddleware({
    locales: cfg.locales,
    defaultLocale: "en",
  })
);

export const config = {
  matcher: ["/", "/(mm|en)/:path*"],
};
