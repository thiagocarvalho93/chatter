import { useLocation } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import chatHub from "../plugins/chatHub";
import { fetchMessages } from "../api/message-api";
import { MessageModel } from "../models/message-model";
import { formatDate } from "../utils/date-util";
import { useNavigate } from "@solidjs/router";

export default function Chat(props) {
  const location = useLocation();
  const username = location.state.name;
  const [messages, setMessages] = createSignal([]);
  const [message, setMessage] = createSignal("");
  const [online, setOnline] = createSignal([]);
  const navigate = useNavigate();

  onMount(async () => {
    const oldMessages = await fetchMessages();
    const initialMessagesArray = oldMessages.map((x) => new MessageModel(x));

    if (!username ||
      !localStorage.getItem("access_token") ||
      !chatHub.hasConnectionId) {

      navigate("/");

      return;
    }

    setMessages(initialMessagesArray);
    chatHub.start();
  });

  chatHub.client.on("ReceiveMessage", (user, message, datetime) => {
    const dateTime = formatDate(new Date(datetime));
    setMessages((old) => [...old, { dateTime, user: user, text: message }]);
  });

  chatHub.client.on("Connect", (message, datetime, online) => {
    const dateTime = formatDate(new Date(datetime));
    setOnline(online);
    setMessages((old) => [...old, { dateTime, user: "Server", text: message }]);
  });

  chatHub.client.on("Disconnect", (message, datetime, online) => {
    const dateTime = formatDate(new Date(datetime));
    setOnline(online);
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
      <div className="flex flex-col flex-1 border-r border-l border-gray-700">
        <div className="bg-gray-900 text-white py-4 px-8 text-xl font-bold border-b border-gray-700">
          <span>Chat</span>
        </div>

        {/* Chat messages */}
        <div className="flex-1 bg-gray-800 shadow-inner text-white p-4 overflow-y-auto">
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
            className="flex-1 bg-gray-800 shadow-inner text-white px-4 py-2 rounded-l focus:outline-none"
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
      <div className="bg-gray-900 hidden md:block w-0 md:w-64 text-white">
        <div className="bg-gray-900 hidden md:block text-white py-4 px-8 text-xl font-bold border-b border-gray-700">
          Who is online?
        </div>
        <ul>
          {/* Add online users list here */}
          {online().map((user, index) => (
            <li key={index} className="p-3 flex flex-row align-text-top border-b border-gray-700">
              <div class="bg-green-700 mr-2 h-3 w-3 rounded-full self-center"></div>
              <span>{user}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
