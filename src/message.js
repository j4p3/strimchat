// ****************************************************************************
// Message Schema
// ****************************************************************************
// {
//   timestamp: int64
//   author: string
//   content: string
//   echoes: int
// }

import { Message as MessageModel } from './db';

export default class Message {
  static requiredMembers() {
    return ['author', 'userId', 'content'];
  }

  static malformedError(context) {
    // @todo formalize error codes
    let e = new Error(`Malformed message object. ${context}`);
    e.code = 0;
    throw e;
  }

  constructor(props) {
    if (typeof props !== 'object') return Message.malformedError('not object');
    Message.requiredMembers().forEach((key) => {
      if (!(key in props)) return Message.malformedError('wrong props');
      this[key] = props[key];
    });
    this.timestamp = Date.now();
  }

  save() {
    // @todo push saves into some kind of queue? worried about overwhelming db with writes
    this.record = MessageModel.create({
      author: this.author,
      user_id: this.userId,
      content: this.content,
      echoes: 0,
    });
  }
}
