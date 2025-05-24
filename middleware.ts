import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

 
  // Set up CORS headers to allow all origins
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Skip certain paths (next.js assets, static files, etc.)
  if (
    path.startsWith("/_next/") || 
    path.startsWith("/api/") || 
    path.startsWith("/static/") || 
    /\.(.*)$/.test(path)
  ) {
    return response;
  }

  // Protected route logic
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token and path starts with /protected, redirect to home
  if (!token && path.startsWith("/protected")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If a token is present, handle redirection based on user_type_id
  if (token) {
    const { user_type_id } = token;

    // Debugging to see if the token and user_type_id are correctly retrieved
    console.log("User token found:", token);
    console.log("User type ID:", user_type_id);

    // Redirect based on user_type_id
    if (user_type_id === 1 && !path.startsWith("/protected")) {
      return NextResponse.redirect(new URL("/protected", req.url));
    } else if (user_type_id === 2 && !path.startsWith("/protectedcorporate")) {
      return NextResponse.redirect(new URL("/protectedcorporate", req.url));
    } else if (user_type_id === 3 && !path.startsWith("/protectedadmin")) {
      return NextResponse.redirect(new URL("/protectedadmin", req.url));
    } else if (user_type_id === 4 && !path.startsWith("/dashboard4")) {
      return NextResponse.redirect(new URL("/dashboard4", req.url));
    }
  }

  return response;
}