import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function Login(props) {
  const [name, setName] = createSignal("");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = () => {
    const nameIsValid = validateName(name());
    if (nameIsValid) {
      navigate("/chat", { state: { name: name() } });
    } else {
      alert("Name is invalid!");
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
