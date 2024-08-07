"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AoiCanvas = exports.log = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const package_json_1 = __importDefault(require("../package.json"));
const function_1 = require("./classes/function");
const gifencoder = require("gif-encoder-2");
let funcs = 0;
const log = (content, type = "log") => {
    const color = (type === "error"
        ? "\x1b[91m"
        : (type === "warn" ? "\x1b[33m" : ""));
    return console[type](`\x1b[0m[\x1b[36maoi.canvas\x1b[0m]: ${color + content}\x1b[0m`);
};
exports.log = log;
const loadFuncs = (client, path) => {
    if (!(0, node_fs_1.existsSync)(path))
        return "notfound";
    (0, node_fs_1.readdirSync)(path)?.forEach(file => {
        const fpath = (0, node_path_1.resolve)(path, file);
        if ((0, node_fs_1.statSync)(fpath).isDirectory())
            loadFuncs(client, fpath);
        if ((0, node_fs_1.statSync)(fpath).isFile() && (file.endsWith(".ts") || file.endsWith(".js")) && !file.endsWith(".d.ts")) {
            try {
                let func = require(fpath);
                func = func.default ?? func;
                if (func instanceof function_1.AoiFunction) {
                    func.register(client);
                    funcs++;
                }
                ;
            }
            catch (err) {
                (0, exports.log)(`Error loading function at path '${fpath}'`, "error");
            }
            ;
        }
        ;
    });
    return "loaded";
};
class AoiCanvas {
    constructor(client) {
        loadFuncs(client, (0, node_path_1.join)(__dirname, "./functions")) === "loaded" ?
            (0, exports.log)(`Loaded ${funcs} functions.`) :
            (0, exports.log)("Failed to load the functions.", "error");
        try {
            (async () => {
                const res = await (await fetch("https://registry.npmjs.org/@aoijs/aoi.canvas", {
                    headers: {
                        "User-Agent": "aoi.canvas",
                    },
                })).json();
                if (!res.versions[package_json_1.default.version])
                    return (0, exports.log)("This is a dev version. Some stuff may be incomplete or unstable.", "warn");
                if (package_json_1.default.version !== res["dist-tags"].latest)
                    return (0, exports.log)("aoi.canvas is outdated!", "warn");
            })();
        }
        catch (e) {
            (0, exports.log)("There was an error fetching aoi.canvas info on npm.", "error");
        }
        ;
    }
}
exports.AoiCanvas = AoiCanvas;
;
//# sourceMappingURL=index.js.map