import tmi from 'tmi.js';

// Replace with your Twitch channel name and the bot's OAuth token
const CHANNEL_NAME = 'twitchplaysgpt';
const BOT_OAUTH_TOKEN = 'oauth:kziy2owsdip91cx2ubulbbeoiqenh7';

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: 'twitchplaysgpt',
    password: BOT_OAUTH_TOKEN,
  },
  channels: [CHANNEL_NAME],
});

export default client;
