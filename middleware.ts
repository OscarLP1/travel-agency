import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhook",
    "/destinations",
    "/about",
    "/contact",
    "/blog",
    "/api/public(.*)",
  ],
  ignoredRoutes: [
    "/api/webhook",
    "/_next/static/(.*)",
    "/favicon.ico",
  ]
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}; 