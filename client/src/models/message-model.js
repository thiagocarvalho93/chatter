import { formatDate } from "../utils/date-util";

export class MessageModel {
  constructor(obj = {}) {
    this.dateTime = obj.dateTime ? formatDate(new Date(obj.dateTime)) : "";
    this.id = obj.id;
    this.text = obj.text;
    this.user = obj.user;
  }
}
