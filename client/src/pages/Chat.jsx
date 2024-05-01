import { useLocation } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import chatHub from "../plugins/chatHub";
import { fetchMessages } from "../api/message-api";
import { MessageModel } from "../models/message-model";
import { formatDate } from "../utils/date-util";

export default function Chat(props) {
  const location = useLocation();
  const username = location.state.name;
  const [messages, setMessages] = createSignal([]);
  const [message, setMessage] = createSignal("");

  onMount(async () => {
    const oldMessages = await fetchMessages();
    const initialMessagesArray = oldMessages.map((x) => new MessageModel(x));

    setMessages(initialMessagesArray);
  });

  chatHub.start();

  chatHub.client.on("ReceiveMessage", (user, message, datetime) => {
    const dateTime = formatDate(new Date(datetime));
    setMessages((old) => [...old, { dateTime, user: user, text: message }]);
  });

  chatHub.client.on("Connect", (message, datetime) => {
    const dateTime = formatDate(new Date(datetime));

    setMessages((old) => [...old, { dateTime, user: "Server", text: message }]);
  });

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (!message()) return;

    chatHub.sendMessage(username, message());
    setMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar for chats */}

      <div className="bg-gray-900 w-64 text-white">
        <div className="bg-gray-900 text-white py-4 px-8 text-xl font-bold">Chatter</div>
        <ul class="max-w-md">
          <li class="p-4 bg-gray-800 transition duration-500 ease-in-out hover:bg-gray-600 cursor-pointer">
            <p>Home</p>
          </li>
          <li class="p-4 transition duration-500 ease-in-out hover:bg-gray-600 cursor-pointer">
            John
          </li>
          <li class="p-4 transition duration-500 ease-in-out hover:bg-gray-600 cursor-pointer">
            Alice
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 border-r border-l border-gray-700">
        {/* Chat header */}
        <div className="bg-gray-900 text-white py-4 px-8 text-xl font-bold border-b border-gray-700">
          Home
        </div>

        {/* Chat messages */}
        <div className="flex-1 bg-gray-800 text-white p-4 overflow-y-auto">
          <ul>
            {messages().map((message, index) => (
              <li key={index} className="mb-4">
                <span className="text-gray-400">[{message.dateTime}]</span>{" "}
                <span className="font-semibold">{message.user}:</span>
                <span className="break-all"> {message.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Text input container */}
        <div className="bg-gray-900 flex items-center p-4 border-t border-gray-700">
          <input
            id="message-input"
            type="text"
            value={message()}
            onInput={handleMessageChange}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none"
            placeholder="Type your message here..."
          />
          <button
            id="send-btn"
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-6 py-2 rounded-r hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>

      {/* Right sidebar for "Who is Online?" */}
      <div className="bg-gray-900 w-64 text-white">
        <div className="bg-gray-900 text-white py-4 px-8 text-xl font-bold">Who is online?</div>
        {/* Add online users list here */}
      </div>
    </div>
  );
}
