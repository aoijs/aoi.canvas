import { AoiClient, Util, AoiError } from "aoi.js";
import { readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { AttachmentBuilder } from "discord.js";
import { CanvasManager } from "./classes";
import { GlobalFonts } from "@napi-rs/canvas";

const loadFuncs = (client: AoiClient, path: string) => {
    if (!existsSync(path))
        return "notfound";

    readdirSync(path)?.forEach(file => {
        const fpath = join(path, file)

        if ((file.endsWith(".ts") || file.endsWith(".js")) && !file.endsWith(".d.ts")) {
            if (statSync(fpath).isDirectory())
                loadFuncs(client, path);

            try {
                let func = require(fpath)
                func = func.default ?? func
                
                if (typeof func !== "object" || !func.name || !func.code || !(typeof func.code === "string" || typeof func.code === "function"))
                    return console.error(`Something is missing at '${file}'`);

                func.type = func.type ? func.type : (typeof func.code === "function" ? "djs" : "aoi.js");

                client.functionManager.createFunction(func);
            } catch (err) {
                console.error(`Error loading function at path '${fpath}'\n`, err)
            }
        }
    })

    return "loaded";
}
const registerFont = (font: { src: Buffer | string, name?: string }) => {
    if (typeof font.src === "string" && existsSync(font.src))
        if (statSync(font.src).isDirectory())
            GlobalFonts.loadFontsFromDir(font.src);
        else if (statSync(font.src).isFile())
            GlobalFonts.registerFromPath(font.src, font.name);
        else
            console.error("[aoi.canvas]: Invalid font source.");
    else if (Buffer.isBuffer(font.src))
        GlobalFonts.register(font?.src, font?.name);
    else
        console.error("[aoi.canvas]: Invalid font source.");
}

export interface AoiD {
    aoiError: typeof AoiError;
    data: {
        canvases: CanvasManager;
    },
    files: AttachmentBuilder[],
    util: typeof Util
}

export class AoiCanvas {
    constructor (client: AoiClient) {
        loadFuncs(client, join(__dirname, "./functions")) === "loaded" ? 
            console.log("[aoi.canvas]: Loaded.") : 
            console.error("[aoi.canvas]: Failed to load.");
    }

    registerFonts (...fonts: { src: Buffer | string, name?: string }[]) {
        for (const font of fonts) {
            try {
                registerFont(font)
            } catch (err) {
                console.error("[aoi.canvas]: Failed to register a font.")
            }
        }
    }
}