# aoi.canvas

aoi.canvas is an aoi.js extension that allows you to create and edit images with your aoi.js bot.

## Installation

```sh
npm install aoi.canvas
```

## Setup

```js
const { AoiClient } = require('aoi.js');
const { AoiCanvas } = require('aoi.canvas');

const client = new AoiClient({
    intents: ['Guilds', 'GuildMessages', 'MessageContent'],
    events: ['onMessage', 'onInteractionCreate'],
    prefix: 'Discord Bot Prefix',
    token: 'Discord Bot Token',
    database: {
        type: 'aoi.db',
        db: require('@akarui/aoi.db'),
        dbType: 'KeyValue',
        tables: ['main'],
        securityKey: 'a-32-characters-long-string-here'
    }
});

const canvas = new AoiCanvas(client);

// Ping Command Example
client.command({
    name: 'ping',
    code: `Pong! $pingms`
});

// House Command Example
client.command({
    name: 'house',
    code: `
        $attachCanvas[mycanvas;house.png]
        $newCanvas[mycanvas;
            $stroke[10]

            $closePath
            $lineTo[250;140]
            $lineTo[150;60]
            $moveTo[50;140]

            $fillRect[130;190;40;60]
            $strokeRect[75;140;150;110]
            
            $fillStyle[#03a9f4]
            $strokeStyle[#03a9f4]

            $setCanvasSize[300;320]
        ]
    `
});
```

If you have any questions or need help, ask in the official aoi.js [server](https://discord.com/invite/HMUfMXDQsV).

Enjoy coding with aoi.canvas! ❤