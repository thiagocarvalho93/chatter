import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { loginTemp } from "../api/user-api";
import chatHub from "../plugins/chatHub";

export default function Login(props) {
  const [name, setName] = createSignal("");
  const navigate = useNavigate();

  chatHub.stop()

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    const username = name();

    if (!validateName(username)) {
      alert("Name is invalid!");
      return;
    }

    try {
      const token = await loginTemp(username);

      if (!token) {
        throw new Error("Token is null or undefined.");
      }

      localStorage.setItem("access_token", token);

      navigate("/chat", { state: { name: username } });
    } catch (error) {
      console.error("Login failed:", error);
      alert("Failed to login. Please try again.");
    }
  };

  const validateName = (text) =>
    text && typeof text === "string" && text.length > 0 && text.length < 50;

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-8 shadow-lg w-96 border-2 border-gray-700">
        <h1 className="text-white text-2xl font-bold mb-4">Welcome to the Chat!</h1>
        <label htmlFor="name-input" className="block text-gray-300 mb-2">
          Enter your name:
        </label>
        <input
          id="name-input"
          type="text"
          value={name()}
          onInput={handleNameChange}
          onKeyDown={handleKeyPress}
          className="block w-full bg-gray-700 text-white border border-gray-600 rounded px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
          placeholder="Your name"
        />
        <button
          onClick={handleLogin}
          className="block w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Enter Chat
        </button>
      </div>
    </div>
  );
}
