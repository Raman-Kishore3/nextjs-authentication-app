//was called middlewares but now changed to proxy but the implementation remains the same

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";
  const token = request.cookies.get("token")?.value || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/verifyemail"],
};
