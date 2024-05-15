"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AoiCanvas = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const canvas_1 = require("@napi-rs/canvas");
const package_json_1 = __importDefault(require("../package.json"));
const loadFuncs = (client, path) => {
    if (!(0, node_fs_1.existsSync)(path))
        return "notfound";
    (0, node_fs_1.readdirSync)(path)?.forEach(file => {
        const fpath = (0, node_path_1.join)(path, file);
        if ((file.endsWith(".ts") || file.endsWith(".js")) && !file.endsWith(".d.ts")) {
            if ((0, node_fs_1.statSync)(fpath).isDirectory())
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
    if (typeof font.src === "string" && (0, node_fs_1.existsSync)(font.src))
        if ((0, node_fs_1.statSync)(font.src).isDirectory())
            canvas_1.GlobalFonts.loadFontsFromDir(font.src);
        else if ((0, node_fs_1.statSync)(font.src).isFile())
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
        loadFuncs(client, (0, node_path_1.join)(__dirname, "./functions")) === "loaded" ?
            console.log("[\x1b[36maoi.canvas\x1b[0m]: Loaded.") :
            console.error("[\x1b[36maoi.canvas\x1b[0m]: \x1b[91mFailed to load.\x1b[0m");
        try {
            (async () => {
                const res = await (await fetch("https://registry.npmjs.org/aoi.canvas", {
                    headers: {
                        "User-Agent": "aoi.canvas",
                    },
                })).json();
                if (!res.versions[package_json_1.default.version])
                    return console.log("[\x1b[36maoi.canvas\x1b[0m]: \x1b[33mThis is a dev version. Some stuff may be incomplete or unstable.\x1b[0m");
                if (package_json_1.default.version !== res["dist-tags"].latest)
                    return console.log("[\x1b[36maoi.canvas\x1b[0m]: \x1b[91maoi.canvas is outdated!\x1b[0m");
            })();
        }
        catch (e) { }
        ;
    }
    registerFonts(...fonts) {
        for (const font of fonts) {
            try {
                if (typeof font?.src === "string")
                    font.src = (0, node_path_1.join)(process.cwd(), font?.src);
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