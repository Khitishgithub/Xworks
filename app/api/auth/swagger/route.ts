// app/auth/swagger/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const swaggerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Swagger UI</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css">
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = () => {
      const ui = SwaggerUIBundle({
        url: "/api/auth/swagger-doc", // Updated URL to Swagger JSON
        dom_id: "#swagger-ui",
      });
    };
  </script>
</body>
</html>
  `;

  return new Response(swaggerHtml, {
    headers: { "Content-Type": "text/html" },
  });
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 }); // Handle preflight requests
}
