let canvas = require("@napi-rs/canvas");
let fs = require("fs");
let path = require("path");

module.exports = {
    load: (Lobj) => {
        const canvaWarn = require("./util/canvaWarn.js");

        const bot = Lobj.bot;
        const df = Lobj.DownloadFolder || "./canvas/";
        const et = Lobj.ErrorsType || "message";

        this.data = {
            "bot": bot,
            "DownloadFolder": df,
            "ErrorsType": et
        }

        for (const file of fs.readdirSync(path.join(__dirname, "./functions")).filter(file => file.endsWith(".js"))) {
            var thefunction = require("./functions/"+file);
            bot.functionManager.createFunction(
                thefunction
            );
        };

        if (et !== "console" && et !== "msg" && et !== "message" && et !== "none") {
            canvaWarn.newWarn(`Unknown 'ErrorsType' option type. AoiCanvas Errors would not be shown.`);
        }

        console.log(`\x1b[96m|---------------|\n|---\x1b[97mAoiCanvas\x1b[96m---|\n|----\x1b[97mLoaded.\x1b[96m----|\n|---------------|\x1b[0m`);
    },

    getData: () => {
        return this.data;
    },

    utils: {
        canvaError: require("./util/canvaError.js"),
        canvaWarn: require("./util/canvaWarn.js")
    }
};