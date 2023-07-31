# Aoi Canvas

Aoi Canvas is a package that allows you to utilize canvas functions with Aoi.js Bot.

## Setup

1. Install `aoi.canvas` package:
```shell
npm install aoi.canvas
```

2. Import the `aoi.canvas` library into your project:
```javascript
const aoicanva = require("aoi.canvas");
```

3. Load Aoi Canvas with the required parameters:
```javascript
aoicanva.load({
  bot: bot, // Aoi.js Bot object.
  DownloadFolder: "./folder/", // Folder for $downloadCanvas, optional.
  ErrorsType: "console" // AoiCanva errors type, optional. (console/message/none)
});
```

4. You are ready to use Aoi Canvas with your Aoi.js Bot!

## Example

```javascript
const { AoiClient } = require("aoi.js");
const aoicanva = require("aoi.canvas");

const bot = new AoiClient({
    token: "BOT TOKEN",
    prefix: "BOT PREFIX",
    intents: ["MessageContent", "Guilds", "GuildMessages"],
    events: ["onMessage", "onInteractionCreate"],
    database: {
        type: "aoi.db",
        db: require("@akarui/aoi.db"),
        tables: ["main"],
        path: "./database/",
        extraOptions: {
            dbType: "KeyValue"
        }
    }
});

aoicanva.load({
    bot: bot,
    DownloadFolder: "./canvasdownloads/",
    ErrorsType: "console"
});

// Ping Command Example
bot.command({
    name: "ping",
    code: `Pong! $pingms`
});

// Leref Command Example
bot.command({
    name: "leref",
    code: `
$sendCanvas[lerefPro;msg]
$lerefPro
`
});

// Semi round avatar
bot.command({
    name: "test",
    code: `
        $title[CANVAS OWO]
        $sendCanvas[test;image]
        $drawImage[test;pon;1;1;512;512;280]
        $loadImage[test;pon;url;$nonEscape[$userAvatar[$authorID]]]
        $createCanvas[test]
    `
});
```

## Credits

- lordex (uwu)
- fafa (some ideas)
- akaruiteam (aoi.js)
- neo

These are the contributors who have contributed to the Aoi Canvas project.

---

Remember to install the required dependencies and follow the setup steps mentioned above to start using Aoi Canvas in your Aoi.js Bot.

Feel free to reach out if you have any questions or need further assistance.

Enjoy coding with Aoi Canvas!