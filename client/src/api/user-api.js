import { BASE_URL } from "../constants/app-constants";

export async function loginTemp(name) {
  try {
    const body = JSON.stringify({ name });
    const response = await fetch(`${BASE_URL}/api/v1/users/login-temp`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch request:", error);
  }
}
