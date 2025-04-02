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
    "Content-Type": "application/json",
    ...headers,
  };

  if (isServer) {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const allCookies = cookieStore.getAll();

      if (allCookies.length > 0) {
        defaultHeaders.Cookie = allCookies
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join("; ");
      }
    } catch (error) {
      console.warn("Failed to get cookies:", error);
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
