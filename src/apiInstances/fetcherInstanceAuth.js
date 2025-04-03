import Cookies from "js-cookie";

export async function fetcherInstanceAuth(
  endpoint,
  { method = "GET", body = null, headers = {} } = {}
) {
  const isServer = typeof window === "undefined";

  if (!endpoint || typeof endpoint !== "string") {
    throw new Error("Endpoint must be a valid string");
  }

  const defaultHeaders = {
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
    ...headers,
  };

  if (isServer) {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const authCookie = cookieStore.get("auth_token");

      if (authCookie) {
        defaultHeaders.Cookie = `${authCookie.name}=${authCookie.value}`;
      }
    } catch (error) {
      console.warn("Failed to get cookies:", error);
    }
  } else {
    const authToken = Cookies.get("auth_token");
    console.log("🚀 ~ authToken:", authToken);
    if (authToken) {
      defaultHeaders.Cookie = `auth_token=${authToken}`;
    }
  }

  const options = {
    method,
    headers: defaultHeaders,
    credentials: isServer ? undefined : "include",
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    console.warn("NEXT_PUBLIC_BASE_URL is not set");
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
  const response = await fetch(apiUrl, options);

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  return response.json();
}
