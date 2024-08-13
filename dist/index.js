"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AoiCanvas = exports.registerFonts = exports.log = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const package_json_1 = __importDefault(require("../package.json"));
const function_1 = require("./classes/function");
const canvas_1 = require("@napi-rs/canvas");
const gifencoder = require('gif-encoder-2');
let funcs = 0;
const log = (content, type = 'log') => {
    const color = (type === 'error'
        ? '\x1b[91m'
        : (type === 'warn' ? '\x1b[33m' : ''));
    return console[type](`\x1b[0m[\x1b[36maoi.canvas\x1b[0m]: ${color + content}\x1b[0m`);
};
exports.log = log;
const loadFuncs = (client, path) => {
    if (!(0, node_fs_1.existsSync)(path))
        return 'notfound';
    (0, node_fs_1.readdirSync)(path)?.forEach(file => {
        const fpath = (0, node_path_1.resolve)(path, file);
        if ((0, node_fs_1.statSync)(fpath).isDirectory())
            loadFuncs(client, fpath);
        if ((0, node_fs_1.statSync)(fpath).isFile() && (file.endsWith('.ts') || file.endsWith('.js')) && !file.endsWith('.d.ts')) {
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
                (0, exports.log)(`Error loading function at path '${fpath}'`, 'error');
            }
            ;
        }
        ;
    });
    return 'loaded';
};
const registerFonts = (fonts) => fonts.forEach(font => {
    if (!(0, node_fs_1.existsSync)(font.path))
        throw Error(`Invalid font path. (${font.path})`);
    if ((0, node_fs_1.statSync)(font.path).isFile()) {
        let filename = (0, node_path_1.basename)(font.path);
        if (!['ttf', 'otf', 'woff', 'woff2'].find(x => filename.endsWith(`.${x}`)))
            return;
        filename = font.name ?? filename.split('.').slice(0, -1).join('.');
        canvas_1.GlobalFonts.registerFromPath(font.path, filename);
        (0, exports.log)(`Registered '${filename}' font.`);
    }
    else
        return (0, exports.registerFonts)((0, node_fs_1.readdirSync)(font.path).map(x => ({ path: (0, node_path_1.join)(font.path, x) })));
});
exports.registerFonts = registerFonts;
class AoiCanvas {
    constructor(client) {
        loadFuncs(client, (0, node_path_1.join)(__dirname, './functions')) === 'loaded' ?
            (0, exports.log)(`Loaded ${funcs} functions.`) :
            (0, exports.log)('Failed to load the functions.', 'error');
        try {
            (async () => {
                const res = await (await fetch('https://registry.npmjs.org/@aoijs/aoi.canvas', {
                    headers: {
                        'User-Agent': 'aoi.canvas',
                    },
                })).json();
                if (!res.versions[package_json_1.default.version])
                    return (0, exports.log)('This is a dev version. Some stuff may be incomplete or unstable.', 'warn');
                if (package_json_1.default.version !== res['dist-tags'].latest)
                    return (0, exports.log)('aoi.canvas is outdated!', 'warn');
            })();
        }
        catch (e) {
            (0, exports.log)('There was an error fetching aoi.canvas info on npm.', 'error');
        }
        ;
    }
}
exports.AoiCanvas = AoiCanvas;
;
__exportStar(require("./typings"), exports);
__exportStar(require("./classes"), exports);
//# sourceMappingURL=index.js.map