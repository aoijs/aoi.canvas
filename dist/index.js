"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AoiCanvas = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const canvas_1 = require("@napi-rs/canvas");
const loadFuncs = (client, path) => {
    if (!(0, fs_1.existsSync)(path))
        return "notfound";
    (0, fs_1.readdirSync)(path)?.forEach(file => {
        const fpath = (0, path_1.join)(path, file);
        if ((file.endsWith(".ts") || file.endsWith(".js")) && !file.endsWith(".d.ts")) {
            if ((0, fs_1.statSync)(fpath).isDirectory())
                loadFuncs(client, path);
            try {
                let func = require(fpath);
                func = func.default ?? func;
                if (typeof func !== "object" || !func.name || !func.code || !(typeof func.code === "string" || typeof func.code === "function"))
                    return console.error(`Something is missing at '${file}'`);
                func.type = func.type ? func.type : (typeof func.code === "function" ? "djs" : "aoi.js");
                client.functionManager.createFunction(func);
            }
            catch (err) {
                console.error(`Error loading function at path '${fpath}'\n`, err);
            }
        }
    });
    return "loaded";
};
const registerFont = (font) => {
    if (typeof font.src === "string" && (0, fs_1.existsSync)(font.src))
        if ((0, fs_1.statSync)(font.src).isDirectory())
            canvas_1.GlobalFonts.loadFontsFromDir(font.src);
        else if ((0, fs_1.statSync)(font.src).isFile())
            canvas_1.GlobalFonts.registerFromPath(font.src, font.name);
        else
            console.error("[aoi.canvas]: Invalid font source.");
    else if (Buffer.isBuffer(font.src))
        canvas_1.GlobalFonts.register(font?.src, font?.name);
    else
        console.error("[aoi.canvas]: Invalid font source.");
};
class AoiCanvas {
    constructor(client) {
        loadFuncs(client, (0, path_1.join)(__dirname, "./functions")) === "loaded" ?
            console.log("[aoi.canvas]: Loaded.") :
            console.error("[aoi.canvas]: Failed to load.");
    }
    registerFonts(...fonts) {
        for (const font of fonts) {
            try {
                registerFont(font);
            }
            catch (err) {
                console.error("[aoi.canvas]: Failed to register a font.");
            }
        }
    }
}
exports.AoiCanvas = AoiCanvas;
//# sourceMappingURL=index.js.map