// ****************************************************************************
// Message Schema
// ****************************************************************************
// {
//   timestamp: int64
//   author: string
//   content: string
//   meta: {
//     echos: int       (to be used for 'echo' functionality)
//   }
// }

export default class Message {
  static requiredMembers() {
    return ['author', 'content'];
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
}
