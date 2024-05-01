export async function fetchMessages() {
  try {
    const response = await fetch("http://localhost:5014/api/v1/messages");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch request:", error);
  }
}
