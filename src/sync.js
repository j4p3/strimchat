import { Message } from './db';

Message.sync().then(() => {
  console.log('\x1b[32m%s\x1b[0m', 'Table synced: Message')
}).catch(e => console.log(e));
