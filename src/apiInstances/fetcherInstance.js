export async function fetcherInstance(
  endpoint,
  { method = "GET", body = null, headers = {} } = {}
) {
  if (!endpoint || typeof endpoint !== "string") {
    throw new Error("Endpoint must be a valid string");
  }

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  const options = {
    method,
    headers: defaultHeaders,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    console.warn("NEXT_PUBLIC_BASE_URL is not set");
  }

  const response = await fetch(apiUrl, options);

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  const apiResponse = await response.json();

  return apiResponse;
}
