import { authMiddleware } from "@clerk/nextjs/server"

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: ["/", "/login", "/signup", "/api/(.*)"],
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
