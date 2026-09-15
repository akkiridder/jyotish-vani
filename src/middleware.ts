import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = await updateSession(request);
    
    const { data: { user } } = await supabase.auth.getUser();
    const { pathname } = new URL(request.url);

    if (!user && (pathname.startsWith("/intake") || pathname.startsWith("/consultation"))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (user) {
      const { data: birthDetails } = await supabase
        .from("user_birth_details")
        .select("user_id")
        .eq("user_id", user.id)
        .single();

      if (!birthDetails && pathname.startsWith("/consultation")) {
        return NextResponse.redirect(new URL("/intake", request.url));
      }
    }
    
    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
