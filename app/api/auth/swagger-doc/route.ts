// app/auth/swagger-doc/route.ts
import { NextRequest, NextResponse } from "next/server";
import swaggerSpec from "../../../config/swagger-doc";

export async function GET(request: NextRequest) {
  return NextResponse.json(swaggerSpec, { status: 200 }); // Serve the Swagger JSON spec
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 }); // Handle preflight requests
}
