let canvas = require("@napi-rs/canvas");
let fs = require("fs");
let path = require("path");

module.exports = {
    load: (Lobj) => {
        const canvaWarn = require("./util/canvaWarn.js");

        const bot = Lobj.bot;
        const df = Lobj.DownloadFolder || "./canvas/";
        const et = Lobj.ErrorsType || "message";
        const vers = Lobj.version || "v6";

        this.data = {
            "bot": bot,
            "DownloadFolder": df,
            "ErrorsType": et,
            "version": vers
        };

        if (vers && vers.toLowerCase() !== "v6") 
            return canvaError.newWarn("Version '"+vers+"' not found! Please set version to \"v6\". If you dont change it to supported version aoi.canvas will not work!");
        if (!["console", "msg", "message", "none"].includes(et))
            return canvaWarn.newWarn(`Unknown 'ErrorsType' option type. AoiCanvas Errors would not be shown.`);
        const functions = fs.readdirSync(path.join(__dirname, "./functions/v6")).filter(file => file.endsWith(".js"));
        for (const file of functions) {
            const thefunction = require("./functions/v6/"+file);
            bot.functionManager.createFunction(thefunction);
        };
        console.log(`\x1b[96m|---------------|\n|---\x1b[97mAoiCanvas\x1b[96m---|\n|----\x1b[97mLoaded.\x1b[96m----|\n|-----\x1b[97maoiv6\x1b[96m-----|\n|---------------|\x1b[0m`);
    },

    getData: () => {
        return this.data;
    },

    utils: {
        canvaError: require("./util/canvaError.js"),
        canvaWarn: require("./util/canvaWarn.js")
    }
};

/** 
* @typedef {"console" | "msg" | "message" | "none"} ErrorTypes
* @typedef {"v6"} Versions
*/