import { BASE_URL } from "../constants/app-constants";

export async function loginTemp(name) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/users/login-temp?name=${name}`,
      {
        method: "POST",
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
