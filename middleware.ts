import createMiddleware from "next-intl/middleware";
import { routing } from "./utils/navigation";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ca|es|en)/:path*"],
};
