import { AoiClient, Util, AoiError } from "aoi.js";
import { readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { AttachmentBuilder } from "discord.js";
import { CanvasBuilder, CanvasManager } from "./classes";
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
const mustEscape = (input: string) => {
    return input.split("\\[")
        .join("#RIGHT#")
        .replace(/\\]/g, "#LEFT#")
        .replace(/\\;/g, "#SEMI#")
        .replace(/\\:/g, "#COLON#")
        .replace(/\\$/g, "#CHAR#")
        .replace(/\\>/g, "#RIGHT_CLICK#")
        .replace(/\\</g, "#LEFT_CLICK#")
        .replace(/\\=/g, "#EQUAL#")
        .replace(/\\{/g, "#RIGHT_BRACKET#")
        .replace(/\\}/g, "#LEFT_BRACKET#")
        .replace(/\\,/g, "#COMMA#")
        .replace(/\\&&/g, "#AND#")
        .replaceAll("\\||", "#OR#");
}
const escape = (input: string) => {
    return input.replace(/#RIGHT#/g, "[")
        .replace(/#LEFT#/g, "]")
        .replace(/#SEMI#/g, ";")
        .replace(/#COLON#/g, ":")
        .replace(/#CHAR#/g, "$")
        .replace(/#RIGHT_CLICK#/g, ">")
        .replace(/#LEFT_CLICK#/g, "<")
        .replace(/#EQUAL#/g, "=")
        .replace(/#RIGHT_BRACKET#/g, "{")
        .replace(/#LEFT_BRACKET#/g, "}")
        .replace(/#COMMA#/g, ",")
        .replace(/#LB#/g, "(")
        .replace(/#RB#/g, ")")
        .replace(/#AND#/g, "&&")
        .replace(/#OR#/g, "||");
};

export interface AoiD {
    aoiError: typeof AoiError;
    data: {
        canvases: CanvasManager;
    },
    files: AttachmentBuilder[],
    util: typeof Util
}

export const FileParser = async (input: string, d: AoiD) => {
    if (!input) return;
    input = mustEscape(input);
    console.log("e")

    const Checker = (parser: string) => input.includes("{" + parser + ":");  
    const att = [];

    if (Checker("attachment")) {
        const attachments = input
            ?.split("{attachment:")
            ?.slice(1)
            .map((x) => x.trim());
    
        for (let attach of attachments) {
            const insides = attach?.split("}")[0].split(":");
            let last = insides?.pop();
            let content: string | Buffer | undefined = insides?.join(":")?.length > 0 ? escape(insides.join(":").toString()) : undefined;
            last = last ? escape(last) : "";

            console.log(content, last);

            if (content?.[0]?.trim() === "canvas") {
                let canvas: CanvasBuilder | string | undefined = content?.split(":")?.slice(1)?.join(":");
                if (typeof canvas === "string" && (!d.data.canvases || !(d.data.canvases instanceof CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof CanvasBuilder)))
                    return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);

                canvas = d.data.canvases.get(canvas);

                content = canvas?.render();
            }

            try {
                const attachment = new AttachmentBuilder(
                    Buffer.isBuffer(content) ? content : last, 
                    { name: !Buffer.isBuffer(content) ? content : last ?? "attachment.png" }
                );
                att.push(attachment);
            } catch (err) {
                AoiError.fnError(d, "string", {}, "Something went wrong making an attachment.");
                console.error(err);
            }
        }
    }
    if (Checker("file")) {
        const files = input
            .split("{file:")
            ?.slice(1)
            .map((x) => x.trim());
        
        for (let file of files) {
            const insides = file?.split("}")[0].split(":");
            let last = insides?.pop();
            last = last ? escape(last) : "";
    
            try {
                const attachment = new AttachmentBuilder(
                    Buffer.from(last),
                    { name: insides?.join(":")?.length > 0 ? escape(insides.join(":").toString()) : "file.txt" }
                );
                att.push(attachment);
            } catch (err) {
                AoiError.fnError(d, "string", {}, "Something went wrong making an attachment.");
                console.error(err);
            }
        }
    }
    return att;
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
                if (typeof font?.src === "string")
                    font.src = join(process.cwd(), font?.src);

                registerFont(font)
            } catch (err) {
                console.error("[aoi.canvas]: Failed to register a font.")
            }
        }
    }
}