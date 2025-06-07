import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/destinations",
    "/destinations/(.*)",
    "/about",
    "/contact",
    "/blog",
    "/api/public(.*)",
  ],
  ignoredRoutes: [
    "/_next/static/(.*)",
    "/favicon.ico",
  ]
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}; 