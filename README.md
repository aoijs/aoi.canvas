# aoi.canvas

aoi.canvas is a aoi.js extension that allows you to utilize canvas functions with aoi.js bot.

## Installation

```sh
npm install aoi.canvas
```

## Setup

```js
const { AoiClient } = require("aoi.js");
const { AoiCanvas } = require("aoi.canvas");

const client = new AoiClient({
    intents: ["Guilds", "GuildMessages", "MessageContent"],
    events: ["onMessage", "onInteractionCreate"],
    prefix: "Discord Bot Prefix",
    token: "Discord Bot Token",
    database: {
        type: "aoi.db",
        db: require("@akarui/aoi.db"),
        dbType: "KeyValue",
        tables: ["main"],
        securityKey: "a-32-characters-long-string-here"
    }
});

const canvas = new AoiCanvas(client);

// Ping Command Example
client.command({
    name: "ping",
    code: `Pong! $pingms`
});
```

Feel free to dm me in discord (devlordduck2) if you have any questions or need help, or just ask in the official aoi.js [server](https://discord.com/invite/HMUfMXDQsV).

Enjoy coding with aoi.canvas! ❤