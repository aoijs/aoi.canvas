const canvaError = require("../../index.js").utils.canvaError;
const parser = require("../../index.js").utils.parser;
const { loadImage, GlobalFonts, createCanvas } = require("@napi-rs/canvas");
const getData = require("../../index.js").getData;
const fs = require("fs");
const nodepath = require("path");

function convertToInt(str) {
    const number = parseInt(str);
    if (isNaN(number)) {
        return 0;
    }
    return number;
};

let loadedFonts = [];

String.prototype.onEmpty = function (ifempty) {
    if (this.trim().length === 0) {
        return ifempty;
    } else {
        return this.toString();
    }
};

String.prototype.unescape = function () {
    if (this.trim().length === 0) return "";

    var result = this
        .replace(/&COLON&/g, ":")
        .replace(/&BR&/g, "{")
        .replace(/&BL&/g, "}");

    return result;
};

String.prototype.escape = function () {
    if (this.trim().length === 0) return "";

    var result = this
        .replace(/:/g, "&COLON&")
        .replace(/{/g, "&BR&")
        .replace(/}/g, "&BL&");

    return result;
};

let fishes = {
    image: async function (duck) {
        let ctx = duck.canv.ctx;
        let [ type = "url", path, x = "0", y = "0", w = duck.canv.canvas.width.toString(), h = duck.canv.canvas.height.toString(), radius = "0" ] = duck.fish.params

        type = type.onEmpty("url") || undefined; x = x.onEmpty("0"); y = y.onEmpty("0"); w = w.onEmpty("0"); h = h.onEmpty("0"); radius = radius.onEmpty("0")

        if (radius && radius.toLowerCase() === "%circle%")
            radius = convertToInt(w) / 2;

        if (!path) return canvaError.newError(duck.d, `Please provide (path/link) parameter.`);
        
        if (type && (
            type.toLowerCase() === "link" 
            || 
            type.toLowerCase() === "url"
        ) === true) {
            let image;

            await loadImage(path.addBrackets().unescape()).then((img) => {
                image = img;
            });

            if (!duck.d.data.canvases[duck.settings.params[0]].images) {
                duck.d.data.canvases[duck.settings.params[0]].images = {};
            }
            duck.d.data.canvases[duck.settings.params[0]].images[(duck.d.data.canvases[duck.settings.params[0]].images.length + 1).toString()] = image

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(convertToInt(x) + parseInt(radius), convertToInt(y));
            ctx.arcTo(convertToInt(x) + convertToInt(w), convertToInt(y), convertToInt(x) + convertToInt(w), convertToInt(y) + convertToInt(h), parseInt(radius));
            ctx.arcTo(convertToInt(x) + convertToInt(w), convertToInt(y) + convertToInt(h), convertToInt(x), convertToInt(y) + convertToInt(h), parseInt(radius));
            ctx.arcTo(convertToInt(x), convertToInt(y) + convertToInt(h), convertToInt(x), convertToInt(y), parseInt(radius));
            ctx.arcTo(convertToInt(x), convertToInt(y), convertToInt(x) + convertToInt(w), convertToInt(y), parseInt(radius));
            ctx.closePath();
            ctx.clip();
            await ctx.drawImage(image, convertToInt(x), convertToInt(y), convertToInt(w), convertToInt(h));
            ctx.restore();
        } else if (type && (
            type.toLowerCase() === "file"
            ||
            type.toLowerCase() === "path"
            ||
            type.toLowerCase() === "local"
        ) === true) {
            let image;

            await loadImage(nodepath.join(__dirname, path.addBrackets().replace(/&COLON&/g, ":"))).then((img) => {
                image = img;
            });

            if (!duck.d.data.canvases[duck.settings.params[0]].images) {
                duck.d.data.canvases[duck.settings.params[0]].images = {};
            }
            duck.d.data.canvases[duck.settings.params[0]].images[(duck.d.data.canvases[duck.settings.params[0]].images.length + 1).toString()] = image

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(convertToInt(x) + parseInt(radius), convertToInt(y));
            ctx.arcTo(convertToInt(x) + convertToInt(w), convertToInt(y), convertToInt(x) + convertToInt(w), convertToInt(y) + convertToInt(h), parseInt(radius));
            ctx.arcTo(convertToInt(x) + convertToInt(w), convertToInt(y) + convertToInt(h), convertToInt(x), convertToInt(y) + convertToInt(h), parseInt(radius));
            ctx.arcTo(convertToInt(x), convertToInt(y) + convertToInt(h), convertToInt(x), convertToInt(y), parseInt(radius));
            ctx.arcTo(convertToInt(x), convertToInt(y), convertToInt(x) + convertToInt(w), convertToInt(y), parseInt(radius));
            ctx.closePath();
            ctx.clip();
            await ctx.drawImage(image, convertToInt(x), convertToInt(y), convertToInt(w), convertToInt(h));
            ctx.restore();
        } else {
            duck.fish.params[0] = ">"+duck.fish.params[0]+"<"
            return canvaError.newError(duck.d, `Invalid type. {${duck.fish.name}:${duck.fish.params.join(":")}}`)
        }
    },
    font: async function (duck) {
        let [ font = "10px Arial" ] = duck.fish.params;
        font = font.onEmpty("10px Arial");

        duck.canv.ctx.font = font;
    },
    addfont: async function (duck) {
        let [ font = "MyFont", path ] = duck.fish.params;
        font = font.onEmpty("MyFont");
        
        if (!path) return canvaError.newError(duck.d, `No Path parameter. ({${duck.fish.name}:${duck.params.join(":")}})`);

        const data = fs.readFileSync(nodepath.join(getData().dirname, path));

        if (loadedFonts.find(tfont => tfont.name === font) && loadedFonts.find(tfont => tfont.data === data)) return;

        GlobalFonts.register(data, font.addBrackets().unescape());
    },
    text: async function (duck) {
        let ctx = duck.canv.ctx;
        let [ text = "Text", font = "30px Arial", color = "#000000", x = "1", y = "1", strokecolor = "#000000", strokesize = "0" ] = duck.fish.params;
        
        text = text.onEmpty("Text")
        font = font.onEmpty("30px Arial")
        color = color.onEmpty("000000")
        x = x.onEmpty("center")
        y = y.onEmpty("center")
        strokecolor = strokecolor.onEmpty("#000000")
        strokesize = strokesize.onEmpty("0")

        ctx.font = font;
        ctx.fillStyle = color;

        const oldstrokecolor = ctx.strokeStyle;
        const oldstrokesize = ctx.lineWidth;

        ctx.strokeStyle = strokecolor;
        ctx.lineWidth = strokesize;

        const oldalign = ctx.textAlign;
        const oldbaseline = ctx.textBaseline;

        if (x && x === "center") {
            ctx.textAlign = "center"
            x = duck.canv.canvas.width / 2;
        };

        if (y && y === "center") {
            ctx.textBaseline = "middle"
            y = duck.canv.canvas.height / 2;
        };
        
        if (convertToInt(strokesize) <= 1) {
            ctx.fillText(text.addBrackets().unescape(), convertToInt(x), convertToInt(y));
        } else {
            ctx.strokeText(text.addBrackets().unescape(), convertToInt(x), convertToInt(y));
        };

        ctx.textAlign = oldalign;
        ctx.textBaseline = oldbaseline;
        ctx.strokeStyle = oldstrokecolor;
        ctx.lineWidth = oldstrokesize;
    },
    rect: async function (duck) {
        let ctx = duck.canv.ctx;
        let [ color = "black", x = "center", y = "center", w = "10", h = "10", radius = "0" ] = duck.fish.params;

        color = color.onEmpty("black")
        x = x.onEmpty("center");
        y = y.onEmpty("center");
        w = w.onEmpty("10");
        h = h.onEmpty("10");
        radius = radius.onEmpty("0");

        if (w < 1 || h < 1) {
            if (duck.fish.params[3]) duck.fish.params[3] = (w < 1) ? ">"+duck.fish.params[3]+"<" : duck.fish.params[3];
            if (duck.fish.params[4]) duck.fish.params[4] = (h < 1) ? ">"+duck.fish.params[4]+"<" : duck.fish.params[4];

            return canvaError.newError(duck.d, `Width/Height needs to be greater than 0. ({${duck.fish.name}:${duck.fish.params.join(":")}})`)
        };

        if (x && x.toLowerCase() === "center")
            x = (duck.canv.canvas.width - convertToInt(w)) / 2;

        if (y && y.toLowerCase() === "center")
            y = (duck.canv.canvas.height - convertToInt(h)) / 2;

        if (radius && radius.toLowerCase() === "%circle%")
            radius = convertToInt(w) / 2;

        const step = Math.min(convertToInt(w), convertToInt(h)) * 0.1;

        const oldcolor = ctx.fillStyle;

        if (convertToInt(radius) === 0) {
            ctx.fillStyle = color;
            ctx.fillRect(convertToInt(x), convertToInt(y), convertToInt(w), convertToInt(h));
            ctx.fillStyle = oldcolor;
        } else {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(convertToInt(x) + convertToInt(radius), convertToInt(y));
            ctx.lineTo(convertToInt(x) + convertToInt(w) - convertToInt(radius), convertToInt(y));
            ctx.quadraticCurveTo(convertToInt(x) + convertToInt(w), convertToInt(y), convertToInt(x) + convertToInt(w), convertToInt(y) + convertToInt(radius));
            ctx.lineTo(convertToInt(x) + convertToInt(w), convertToInt(y) + convertToInt(h) - convertToInt(radius));
            ctx.quadraticCurveTo(convertToInt(x) + convertToInt(w), convertToInt(y) + convertToInt(h), convertToInt(x) + convertToInt(w) - convertToInt(radius), convertToInt(y) + convertToInt(h));
            ctx.lineTo(convertToInt(x) + convertToInt(radius), convertToInt(y) + convertToInt(h));
            ctx.quadraticCurveTo(convertToInt(x), convertToInt(y) + convertToInt(h), convertToInt(x), convertToInt(y) + convertToInt(h) - convertToInt(radius));
            ctx.lineTo(convertToInt(x), convertToInt(y) + convertToInt(radius));
            ctx.quadraticCurveTo(convertToInt(x), convertToInt(y), convertToInt(x) + convertToInt(radius), convertToInt(y));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = oldcolor;
        }
    },
    shadow: async function (duck) {
        let ctx = duck.canv.ctx;
        let [ size = "0", color = "#000000" ] = duck.fish.params;

        size = size.onEmpty("0");
        color = color.onEmpty("#000000");

         
        ctx.shadowColor = color;
        ctx.shadowBlur = convertToInt(size);
         
    },
    effects: async function (duck) {
        let ctx = duck.canv.ctx;
        let [ effect = "blur", value = "5" ] = duck.fish.params;

        effect = effect.onEmpty("blur");
        value = value.onEmpty("5");

        const val = convertToInt(value);

        let effects = {
            "grayscale": `grayscale(${val}%)`,
            "blur": `blur(${val}px)`,
            "sepia": `sepia(${val}%)`,
            "brightness": `brightness(${val})`,
            "contrast": `contrast(${val})`,
            "invert": `invert(${val})`,
            "saturate": `saturate(${val})`
        };

        if (effects[effect]) {
            ctx.filter = effects[effect]
        } else {
            return canvaError.newError(d, `Effect '${effect}' not found.`);
        };
    },
    addeffect: async function (duck) {
        let ctx = duck.canv.ctx;
        let [ effect = "blur", value = "5" ] = duck.fish.params;

        effect = effect.onEmpty("blur");
        value = value.onEmpty("5");

        const val = convertToInt(value);

        let effects = {
            "grayscale": `grayscale(${val}%)`,
            "blur": `blur(${val}px)`,
            "sepia": `sepia(${val}%)`,
            "brightness": `brightness(${val})`,
            "contrast": `contrast(${val})`,
            "invert": `invert(${val})`,
            "saturate": `saturate(${val})`
        };

        if (effects[effect]) {
            ctx.filter += " " + effects[effect]
        } else {
            return canvaError.newError(d, `Effect '${effect}' not found.`);
        };
    },
    rotate: async function (duck) {
        let [ angle = "0" ] = duck.fish.params;
        angle = angle.onEmpty("0");

        const canvas = duck.canv.canvas;
        const ctx = duck.canv.ctx;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.translate(centerX, centerY);
        ctx.rotate((angl * Math.PI) / 180);
        ctx.translate(-centerX, -centerY);
    },
    stroke: async function (duck) {
        let ctx = duck.canv.ctx
        let [ color = "#000000", size = "0"] = duck.fish.params;
    
        color = color.onEmpty("#000000");
        size = size.onEmpty("0");

         
        ctx.strokeStyle = color;
        ctx.lineWidth = convertToInt(size);
        await ctx.stroke();
    },
};

module.exports = {
    name: "$canvasBuilder",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const cats = data.inside.splits || [];

        if (cats.length === 0) return;

        for (var cat of cats) {
            let parsed = await parser.catParser(cat);

            if (!parsed) return;
            let settings = parsed.find(fish => fish.name === "settings")
            if (!settings) return canvaError.newError(d, `No settings option.`);
            if (!d.data.canvases) d.data.canvases = {};

            let [cname, w, h] = settings.params || ["canvas", "512", "512"];

            if (cname === "") cname = "canvas";
            if (w === "") cname = "512";
            if (h === "") h = "512";

            cname = cname.trim();
            w = w.trim();
            h = h.trim();
            
            if (!Number(w) || !Number(h)) return canvaError.newError(d, `Invalid size parameter`);

            let canvas = await createCanvas(Number(w), Number(h))
            let canv = {
                canvas: canvas,
                ctx: canvas.getContext("2d")
            };
            
            if (d.data.canvases[cname]) canv = d.data.canvases[cname];
            d.data.canvases[cname] = canv;

            for (var fish of parsed) {
                if (fish && fish.name && typeof fish.name === "string")
                if (fishes[fish.name.toLowerCase()])

                await fishes[fish.name.toLowerCase()]({
                    canv: (d.data.canvases[cname]),
                    d,
                    data,
                    fish: fish,
                    cat,
                    cats,
                    settings,
                    dir: __dirname
                });
            };
        };

        return {
            code: d.util.setCode(data)
        };
    }
}