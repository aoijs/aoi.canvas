"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AoiCanvas = exports.FileParser = void 0;
const aoi_js_1 = require("aoi.js");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const discord_js_1 = require("discord.js");
const classes_1 = require("./classes");
const canvas_1 = require("@napi-rs/canvas");
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
const mustEscape = (input) => {
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
};
const escape = (input) => {
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
const FileParser = async (input, d) => {
    if (!input)
        return;
    input = mustEscape(input);
    console.log("e");
    const Checker = (parser) => input.includes("{" + parser + ":");
    const att = [];
    if (Checker("attachment")) {
        const attachments = input
            ?.split("{attachment:")
            ?.slice(1)
            .map((x) => x.trim());
        for (let attach of attachments) {
            const insides = attach?.split("}")[0].split(":");
            let last = insides?.pop();
            let content = insides?.join(":")?.length > 0 ? escape(insides.join(":").toString()) : undefined;
            last = last ? escape(last) : "";
            console.log(content, last);
            if (content?.[0]?.trim() === "canvas") {
                let canvas = content?.split(":")?.slice(1)?.join(":");
                if (typeof canvas === "string" && (!d.data.canvases || !(d.data.canvases instanceof classes_1.CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof classes_1.CanvasBuilder)))
                    return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
                canvas = d.data.canvases.get(canvas);
                content = canvas?.render();
            }
            try {
                const attachment = new discord_js_1.AttachmentBuilder(Buffer.isBuffer(content) ? content : last, { name: !Buffer.isBuffer(content) ? content : last ?? "attachment.png" });
                att.push(attachment);
            }
            catch (err) {
                aoi_js_1.AoiError.fnError(d, "string", {}, "Something went wrong making an attachment.");
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
                const attachment = new discord_js_1.AttachmentBuilder(Buffer.from(last), { name: insides?.join(":")?.length > 0 ? escape(insides.join(":").toString()) : "file.txt" });
                att.push(attachment);
            }
            catch (err) {
                aoi_js_1.AoiError.fnError(d, "string", {}, "Something went wrong making an attachment.");
                console.error(err);
            }
        }
    }
    return att;
};
exports.FileParser = FileParser;
class AoiCanvas {
    constructor(client) {
        loadFuncs(client, (0, node_path_1.join)(__dirname, "./functions")) === "loaded" ?
            console.log("[aoi.canvas]: Loaded.") :
            console.error("[aoi.canvas]: Failed to load.");
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