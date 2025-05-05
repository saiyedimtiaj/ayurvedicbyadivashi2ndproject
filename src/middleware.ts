import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/auth";

export async function middleware(request: NextRequest) {
  const user = await getCurrentUser();

  if (user && request.url.includes("/auth/sign-in")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!user && request.url.includes("/admin")) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/admin/:path*", "/auth/sign-in"],
};
