import createMiddleware from "next-intl/middleware";
import { routing } from "./utils/navigation";

export default createMiddleware(routing);

export const config = {
  // Matcher ignoring /api, /_next, /_vercel, and files with extensions (e.g. favicon.ico)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
