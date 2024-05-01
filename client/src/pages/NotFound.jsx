import { useNavigate } from "@solidjs/router";

export default function NotFound() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">Sorry, the page you are looking for does not exist.</p>
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none"
      >
        Go to Homepage
      </button>
    </div>
  );
}
