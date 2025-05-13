const BASE_URL = import.meta?.env?.SOLID_APP_API_URL ?? "http://localhost:5014"

export async function fetchMessages() {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/messages`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch request:", error);
  }
}
