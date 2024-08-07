import { AoiClient, Util, AoiError } from "aoi.js";
import { readdirSync, existsSync, statSync } from "node:fs";
import { resolve, join } from "node:path";
import { AttachmentBuilder, BaseChannel, CommandInteraction } from "discord.js";
import { CanvasBuilder, CanvasManager, GIFManager, GradientManager } from "./classes";
import packagejson from "../package.json";
import { AoiFunction } from "./classes/function";
const gifencoder = require("gif-encoder-2");

let funcs = 0;

export const log = (content: string, type: "log" | "warn"| "error" = "log") => {
    const color = 
        (type === "error" 
            ? "\x1b[91m" 
            : (type === "warn" ? "\x1b[33m" : ""));

    return console[type](`\x1b[0m[\x1b[36maoi.canvas\x1b[0m]: ${color + content}\x1b[0m`);
};
const loadFuncs = (client: AoiClient, path: string) => {
    if (!existsSync(path))
        return "notfound";

    readdirSync(path)?.forEach(file => {
        const fpath = resolve(path, file);

        if (statSync(fpath).isDirectory())
            loadFuncs(client, fpath);

        if (statSync(fpath).isFile() && (file.endsWith(".ts") || file.endsWith(".js")) && !file.endsWith(".d.ts")) {
            try {
                let func = require(fpath);
                func = func.default ?? func;

                if (func instanceof AoiFunction) {
                    func.register(client);
                    funcs++;
                };
            } catch (err) {
                log(`Error loading function at path '${fpath}'`, "error");
            };
        };
    });

    return "loaded";
};

export interface AoiD {
    error: Function;
    interpreter: Function;
    client: AoiClient;
    channel: BaseChannel;
    aoiError: typeof AoiError;
    data: {
        canvasManager?: CanvasManager;
        gifManager?: GIFManager;
        gradients?: GradientManager;
        canvas?: CanvasBuilder[];
        gif?: typeof gifencoder;
        colorStops?: [number, string][];
        interaction: CommandInteraction;
    },
    files: AttachmentBuilder[],
    util: typeof Util
}

export class AoiCanvas {
    constructor (client: AoiClient) {
        loadFuncs(client, join(__dirname, "./functions")) === "loaded" ? 
            log(`Loaded ${funcs} functions.`) : 
            log("Failed to load the functions.", "error");

        try {
            (async () => {
                const res = await (await fetch("https://registry.npmjs.org/aoi.canvas", {
                    headers: {
                        "User-Agent": "aoi.canvas",
                    },
                })).json();

                if (!res.versions[packagejson.version])
                    return log("This is a dev version. Some stuff may be incomplete or unstable.", "warn");
                
                if (packagejson.version !== res["dist-tags"].latest)
                    return log("aoi.canvas is outdated!", "warn");
            })();
        } catch (e) {
            log("There was an error fetching aoi.canvas info on npm.", "error");
        };
    }
};