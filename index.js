let { createCanvas, GlobalFonts } = require("@napi-rs/canvas");
let fs = require("fs");
let path = require("path");
const canvaError = require("./util/canvaError.js");
const canvaWarn = require("./util/canvaWarn.js");

module.exports = {
    load: (Lobj) => {
        const canvaWarn = require("./util/canvaWarn.js");

        const bot = Lobj.bot;
        const df = Lobj.DownloadFolder || "./canvas/";
        const et = Lobj.ErrorsType || "message";
        const vers = Lobj.version || "v6";
        const util = Lobj.Util || "none"

        this.data = {
            "bot": bot,
            "Util": util,
            "dirname": process.cwd(),
            "DownloadFolder": df,
            "ErrorsType": et,
            "version": vers,
            "Data": {
                "canvases": {},
                "gifs": {}
            }
        };

        if (util && util !== "none") {
            util.parsers.ErrorHandler = require("./util/parser.js").AllParser;
        };

        if (vers && vers.toLowerCase() === "v6") {
            for (const file of fs.readdirSync(path.join(__dirname, "./functions/v6")).filter(file => file.endsWith(".js"))) {
                var thefunction = require("./functions/v6/"+file);
                bot.functionManager.createFunction(
                    thefunction
                );
            };
            console.log(`\x1b[96m|---------------|\n|---\x1b[97mAoiCanvas\x1b[96m---|\n|----\x1b[97mLoaded.\x1b[96m----|\n|-----\x1b[97maoiv6\x1b[96m-----|\n|---------------|\x1b[0m`);
            
            console.log(" ");
            console.log("\x1b[96m|\x1b[0m \x1b[97mDownloadFolder: "+df+"");
            console.log("\x1b[96m|\x1b[0m \x1b[97mErrorsType: " + et);
            console.log(" ");
        } else {
            canvaWarn.newWarn("Version '"+vers+"' not found!!!!! please set version to \"v6\". If you dont change it to supported version aoi.canvas will not work!")
        };

        if (Lobj.fonts) canvaWarn.newWarn("Fonts in load() no more supported. (Due to error.)"), console.log(" ");

        if (et !== "console" && et !== "msg" && et !== "message" && et !== "none") {
            canvaWarn.newWarn(`Unknown 'ErrorsType' option type. AoiCanvas Errors would not be shown.`);
        };
    },

    getData: () => {
        return this.data;
    },

    canvasData: (tobj) => {
        if (tobj.method) {
            if (tobj.method === "get") {
                return this.data.Data;
            } else if (tobj.method === "set") {
                if (!tobj.where || !tobj.what || !tobj.value) return;

                this.data.Data[tobj.where][tobj.what] = tobj.value;
            }
        }
    },

    utils: {
        canvaError: require("./util/canvaError.js"),
        canvaWarn: require("./util/canvaWarn.js"),
        parser: require("./util/parser.js")
    }
};