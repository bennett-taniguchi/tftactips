// index.ts using modern Worker syntax
import { ExecutionContext } from "@cloudflare/workers-types";
// No need for addEventListener with this approach
export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    // Basic CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };


    //handle auth TEMPORARILY 
     const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    // Your design choice: validate every token
    const userInfo = await fetch(`https://${'dev-a0oi0uq2ah7wnkxf.us.auth0.com'}/userinfo`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    
    if (!userInfo.ok) {

      //return new Response('{"error": "Invalid token"}', { status: 401 });
    }
    // Handle OPTIONS requests for CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // Get URL path

    const url = new URL(request.url);
console.log('pathname',url)
       if (url.pathname === '/favicon.ico' || 
        url.pathname === '/' || 
        url.pathname === '/robots.txt' ||
        !url.pathname.startsWith('/api/')) {
      
      // return new Response('Not Found', { 
      //   status: 404, 
      //   headers: corsHeaders 
      // });
    }

    const awsBaseUrl = env.API_GATEWAY_URL || "N/A base url";
    let path = url.pathname;
    let finalizedUrl = awsBaseUrl + path + url.search;
    console.log("FINALIZED URL:", finalizedUrl);

    try {
      // AWS API Gateway base URL

      // Build API Gateway URL with same path and query params
      const apiUrl = new URL(path, awsBaseUrl);
      url.searchParams.forEach((value, key) => {
        apiUrl.searchParams.append(key, value);
      });
      console.log(url);
      // Forward the request with your secret keys
      const response = await fetch(finalizedUrl, {
        method: request.method,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.API_GATEWAY_KEY, // Access from env
        },
        // Forward the body for POST/PUT requests
        ...(request.method !== "GET" &&
          request.method !== "HEAD" && {
            body: await request.text(),
          }),
      });

      // Return the AWS response to the client
      const responseData = await response.json();

      return new Response(JSON.stringify(responseData), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    } catch (error) {
      // Simple error handling
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.log("something went wrong on workers", error);
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }
  },
};

// Add the Environment interface for TypeScript
interface Env {
  API_GATEWAY_KEY: string;
  API_GATEWAY_URL: string;
  [key: string]: string;
}
