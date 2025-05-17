import { useLocation } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import chatHub from "../plugins/chatHub";
import { fetchMessages } from "../api/message-api";
import { MessageModel } from "../models/message-model";
import { useNavigate } from "@solidjs/router";

export default function Chat() {
  const location = useLocation();
  const username = location.state.name;
  const [messages, setMessages] = createSignal([]);
  const [message, setMessage] = createSignal("");
  const [online, setOnline] = createSignal([]);
  const [isTyping, setIsTyping] = createSignal(false);
  const navigate = useNavigate();
  let chatContainerRef;

  function scrollMessages() {
    chatContainerRef.scrollTop = chatContainerRef.scrollHeight;
  }

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
    scrollMessages();

    chatHub.start();
  });

  chatHub.client.on("ReceiveMessage", (user, text, dateTime) => {
    const messageModel = new MessageModel({ dateTime, user, text });

    setMessages((old) => [...old, messageModel]);

    scrollMessages();
  });

  chatHub.client.on("Connect", (text, dateTime, online) => {
    const messageModel = new MessageModel({ dateTime, user: "Server", text });

    setOnline(online);
    setMessages((old) => [...old, messageModel]);

    scrollMessages();
  });

  chatHub.client.on("Disconnect", (text, dateTime, online) => {
    const messageModel = new MessageModel({ dateTime, user: "Server", text });

    setOnline(online);
    setMessages((old) => [...old, messageModel]);

    scrollMessages();
  });

  const handleMessageChange = (event) => {
    setMessage(event.target.value);

    setIsTyping(!!message());
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
        <div className="bg-gray-900 text-gray-200 py-4 px-8 text-xl font-bold border-b border-gray-700">
          <span>Chat ({online().length} online)</span>
        </div>

        {/* Chat messages */}
        <div
          ref={el => (chatContainerRef = el)}
          className="flex-1 bg-gray-800 text-gray-200 p-4 overflow-y-auto shadow-inner space-y-4"
        >
          <ul className="space-y-2">
            {messages().map((message, index) => (
              <li key={index} className="text-lg break-words">
                <div className="flex flex-col space-y-0.5 mb-3">
                  <span className={`font-bold ${message.color}`}>
                    {message.user}
                    <span className="text-xs ml-2 text-gray-500">
                      {message.dateTime}
                    </span>
                  </span>
                  <span className={`${message.color}`}>
                    {message.text}
                  </span>
                </div>
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
            autocomplete="off"
            onInput={handleMessageChange}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-gray-800 shadow-inner text-gray-200 px-4 py-2 rounded-l focus:outline-none"
            placeholder="Type your message here..."
          />
          <button
            id="send-btn"
            onClick={handleSendMessage}
            className="bg-blue-500 text-gray-200 px-6 py-2 rounded-r hover:bg-blue-600 focus:outline-none"
            disabled={!isTyping()}
          >
            Send
          </button>
        </div>
      </div>

      {/* Right sidebar for "Who is Online?" */}
      <div className="bg-gray-900 hidden md:block w-0 md:w-64 text-gray-200">
        <div className="bg-gray-900 hidden md:block text-gray-200 py-4 px-8 text-xl font-bold border-b border-gray-700">
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
