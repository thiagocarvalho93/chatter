import { HubConnectionBuilder } from "@microsoft/signalr";
import { BASE_URL } from "../constants/app-constants";

class ChatHub {
  constructor() {
    this.client = new HubConnectionBuilder().withUrl(`${BASE_URL}/chat`, {
      accessTokenFactory: () => localStorage.getItem("access_token")
    }).build();
  }

  start() {
    this.client.start();
  }

  stop() {
    this.client.stop();
  }

  hasConnectionId() {
    return !!this.client.connectionId;
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
