import { HubConnectionBuilder } from "@microsoft/signalr";

class ChatHub {
  constructor() {
    const URL = "http://localhost:5014/chat";
    this.client = new HubConnectionBuilder().withUrl(URL, { withCredentials: false }).build();
  }

  start() {
    this.client.start({ withCredentials: false });
  }

  async sendMessage(user, message) {
    try {
      await this.client.invoke("Broadcast", user, message);
    } catch (err) {
      console.error(err);
    }
  }
}

export default new ChatHub();
