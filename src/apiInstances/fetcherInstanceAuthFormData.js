export async function fetcherInstanceAuthFormData(
  endpoint,
  { method = "GET", body = null, headers = {} } = {}
) {
  const isServer = typeof window === "undefined";

  // Validate endpoint
  if (!endpoint || typeof endpoint !== "string") {
    throw new Error("Endpoint must be a valid string");
  }

  const defaultHeaders = {
    "content-type": "multipart/form-data",
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

  const response = await fetch(apiUrl, options);

  // Check if the response was successful
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  const apiResponse = await response.json();

  return apiResponse;
}
