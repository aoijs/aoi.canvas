<p align="center">
  <a href="https://discord.com/invite/HMUfMXDQsV">
    <img width="100" src="https://github.com/aoijs/website/blob/master/assets/images/aoicanvas.png?raw=true" alt="aoi.canvas">
  </a>
</p>

<h1 align="center">@aoijs/aoi.canvas</h1>

<div align="center">

[![Discord Server](https://img.shields.io/discord/773352845738115102?color=5865F2&logo=discord&logoColor=white)](https://discord.com/invite/HMUfMXDQsV)
[![NPM Downloads](https://img.shields.io/npm/dt/@aoijs/aoi.canvas.svg?maxAge=3600)](https://www.npmjs.com/package/@aoijs/aoi.canvas)
[![NPM Version](https://img.shields.io/npm/v/@aoijs/aoi.canvas.svg?maxAge=3600)](https://www.npmjs.com/package/@aoijs/aoi.canvas)

</div>

## About

aoi.canvas is a aoi.js extension that allows you to utilize canvas functions with aoi.js bot.

## Installation

```sh
npm install @aoijs/aoi.canvas
```

## Setup

```js
const {AoiClient} = require("aoi.js");
const {AoiCanvas} = require("@aoijs/aoi.canvas");

const client = new AoiClient({
    intents: ["Guilds", "GuildMessages", "MessageContent"],
    events: ["onMessage", "onInteractionCreate"],
    prefix: "Discord Bot Prefix",
    token: "Discord Bot Token",
    database: {
        type: "aoi.db",
        db: require("@aoijs/aoi.db"),
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

If you have any questions or need help, ask in the official aoi.js [server](https://discord.com/invite/HMUfMXDQsV).

Enjoy coding with aoi.canvas! ❤