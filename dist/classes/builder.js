"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasBuilder = exports.fillRule = exports.textBaseline = exports.Filters = exports.WidthOrHeight = exports.GetOrSet = exports.GradientType = exports.FilterMethod = exports.MeasureTextProperty = exports.textAlign = void 0;
const canvas_1 = require("@napi-rs/canvas");
const util_1 = require("./util");
// This code sucks, you know it and i know it.
// Move on and call me an idiot later
// Enums & Types
var textAlign;
(function (textAlign) {
    textAlign["start"] = "end";
    textAlign["right"] = "left";
    textAlign["center"] = "center";
    textAlign["left"] = "right";
    textAlign["end"] = "start";
})(textAlign || (exports.textAlign = textAlign = {}));
;
var MeasureTextProperty;
(function (MeasureTextProperty) {
    MeasureTextProperty[MeasureTextProperty["actualBoundingBoxAscent"] = 0] = "actualBoundingBoxAscent";
    MeasureTextProperty[MeasureTextProperty["actualBoundingBoxDescent"] = 1] = "actualBoundingBoxDescent";
    MeasureTextProperty[MeasureTextProperty["actualBoundingBoxLeft"] = 2] = "actualBoundingBoxLeft";
    MeasureTextProperty[MeasureTextProperty["actualBoundingBoxRight"] = 3] = "actualBoundingBoxRight";
    MeasureTextProperty[MeasureTextProperty["fontBoundingBoxAscent"] = 4] = "fontBoundingBoxAscent";
    MeasureTextProperty[MeasureTextProperty["fontBoundingBoxDescent"] = 5] = "fontBoundingBoxDescent";
    MeasureTextProperty[MeasureTextProperty["alphabeticBaseline"] = 6] = "alphabeticBaseline";
    MeasureTextProperty[MeasureTextProperty["emHeightAscent"] = 7] = "emHeightAscent";
    MeasureTextProperty[MeasureTextProperty["emHeightDescent"] = 8] = "emHeightDescent";
    MeasureTextProperty[MeasureTextProperty["width"] = 9] = "width";
})(MeasureTextProperty || (exports.MeasureTextProperty = MeasureTextProperty = {}));
;
var FilterMethod;
(function (FilterMethod) {
    FilterMethod[FilterMethod["add"] = 0] = "add";
    FilterMethod[FilterMethod["set"] = 1] = "set";
    FilterMethod[FilterMethod["remove"] = 2] = "remove";
    FilterMethod[FilterMethod["clear"] = 3] = "clear";
    FilterMethod[FilterMethod["get"] = 4] = "get";
    FilterMethod[FilterMethod["parse"] = 5] = "parse";
})(FilterMethod || (exports.FilterMethod = FilterMethod = {}));
;
var GradientType;
(function (GradientType) {
    GradientType[GradientType["linear"] = 0] = "linear";
    GradientType[GradientType["radial"] = 1] = "radial";
    GradientType[GradientType["conic"] = 2] = "conic";
})(GradientType || (exports.GradientType = GradientType = {}));
;
var GetOrSet;
(function (GetOrSet) {
    GetOrSet[GetOrSet["get"] = 0] = "get";
    GetOrSet[GetOrSet["set"] = 1] = "set";
})(GetOrSet || (exports.GetOrSet = GetOrSet = {}));
;
var WidthOrHeight;
(function (WidthOrHeight) {
    WidthOrHeight[WidthOrHeight["width"] = 0] = "width";
    WidthOrHeight[WidthOrHeight["height"] = 1] = "height";
})(WidthOrHeight || (exports.WidthOrHeight = WidthOrHeight = {}));
;
var Filters;
(function (Filters) {
    Filters[Filters["none"] = 0] = "none";
    Filters[Filters["blur"] = 1] = "blur";
    Filters[Filters["sepia"] = 2] = "sepia";
    Filters[Filters["grayscale"] = 3] = "grayscale";
    Filters[Filters["brightness"] = 4] = "brightness";
    Filters[Filters["contrast"] = 5] = "contrast";
    Filters[Filters["invert"] = 6] = "invert";
    Filters[Filters["saturate"] = 7] = "saturate";
})(Filters || (exports.Filters = Filters = {}));
;
var textBaseline;
(function (textBaseline) {
    textBaseline[textBaseline["top"] = 0] = "top";
    textBaseline[textBaseline["hanging"] = 1] = "hanging";
    textBaseline[textBaseline["middle"] = 2] = "middle";
    textBaseline[textBaseline["alphabetic"] = 3] = "alphabetic";
    textBaseline[textBaseline["ideographic"] = 4] = "ideographic";
    textBaseline[textBaseline["bottom"] = 5] = "bottom";
})(textBaseline || (exports.textBaseline = textBaseline = {}));
;
var fillRule;
(function (fillRule) {
    fillRule[fillRule["nonzero"] = 0] = "nonzero";
    fillRule[fillRule["evenodd"] = 1] = "evenodd";
})(fillRule || (exports.fillRule = fillRule = {}));
;
// Builder
class CanvasBuilder {
    ctx;
    util = util_1.CanvasUtil;
    constructor(width, height) {
        this.ctx = (0, canvas_1.createCanvas)(width, height).getContext("2d");
    }
    ;
    drawImage = async (image, x, y, width, height, radius) => {
        image = await (0, canvas_1.loadImage)(image, { maxRedirects: 30 });
        width ??= image.width;
        height ??= image.height;
        const ctx = this.ctx;
        ctx.save();
        if (radius && !Array.isArray(radius) && radius > 0) {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.arcTo(x + width, y, x + width, y + height, radius);
            ctx.arcTo(x + width, y + height, x, y + height, radius);
            ctx.arcTo(x, y + height, x, y, radius);
            ctx.arcTo(x, y, x + width, y, radius);
            ctx.closePath();
            ctx.clip();
        }
        else if (radius && Array.isArray(radius)) {
            const [lTop = 0, rTop = 0, lBottom = 0, rBottom = 0] = radius;
            ctx.beginPath();
            ctx.moveTo(x + lTop, y);
            ctx.arcTo(x + width, y, x + width, y + height, rTop);
            ctx.arcTo(x + width, y + height, x, y + height, rBottom);
            ctx.arcTo(x, y + height, x, y, lBottom);
            ctx.arcTo(x, y, x + width, y, lTop);
            ctx.closePath();
            ctx.clip();
        }
        ;
        ctx.drawImage(image, x, y, width, height);
        ctx.restore();
    };
    fillText = (text, x, y, font, maxWidth, multiline, wrap, lineOffset) => {
        let ctx = this.ctx, oldfont = ctx.font, fontsize = parseInt(font, 10), lines = multiline ? text.split("\n") : [text], offset = y;
        ctx.font = font;
        lines.forEach(t => {
            if (wrap) {
                let line = "";
                t.split(" ").forEach((word, i) => {
                    if (maxWidth && ctx.measureText(line + word + " ").width > maxWidth && i > 0) {
                        ctx.fillText(line, x, offset, maxWidth);
                        line = word + " ";
                        offset += fontsize + (lineOffset ?? 0);
                    }
                    else
                        line += word + " ";
                });
                ctx.fillText(line, x, offset, maxWidth);
                offset += fontsize + (lineOffset ?? 0);
            }
            else {
                ctx.fillText(t, x, offset, maxWidth);
                offset += fontsize + (lineOffset ?? 0);
            }
            ;
        });
        if (!multiline && !wrap)
            ctx.fillText(text, x, y, maxWidth);
        ctx.font = oldfont;
    };
    strokeText = (text, x, y, font, width, maxWidth, multiline, wrap, lineOffset) => {
        let ctx = this.ctx, oldfont = ctx.font, oldwidth = ctx.lineWidth, fontsize = parseInt(font, 10), lines = multiline ? text.split("\n") : [text], offset = y;
        ctx.font = font;
        ctx.lineWidth = width ?? oldwidth;
        lines.forEach(t => {
            if (wrap) {
                let line = "";
                t.split(" ").forEach((word, i) => {
                    if (maxWidth && ctx.measureText(line + word + " ").width > maxWidth && i > 0) {
                        ctx.strokeText(line, x, offset, maxWidth);
                        line = word + " ";
                        offset += fontsize + (lineOffset ?? 0);
                    }
                    else
                        line += word + " ";
                });
                ctx.strokeText(line, x, offset, maxWidth);
                offset += fontsize + (lineOffset ?? 0);
            }
            else {
                ctx.strokeText(t, x, offset, maxWidth);
                offset += fontsize + (lineOffset ?? 0);
            }
            ;
        });
        if (!multiline && !wrap)
            ctx.strokeText(text, x, y, maxWidth);
        ctx.font = oldfont;
        ctx.lineWidth = oldwidth;
    };
    fillRect = (x, y, width, height, radius) => {
        const ctx = this.ctx;
        width ??= ctx.canvas.width;
        height ??= ctx.canvas.height;
        if (radius) {
            ctx.beginPath();
            ctx.roundRect(x, y, width, height, radius);
            ctx.closePath();
            ctx.fill();
        }
        else
            ctx.fillRect(x, y, width, height);
    };
    strokeRect = (x, y, width, height, strokeWidth, radius) => {
        const ctx = this.ctx;
        width ??= ctx.canvas.width;
        height ??= ctx.canvas.height;
        const oldwidth = ctx.lineWidth;
        ctx.lineWidth = strokeWidth ?? 10;
        if (radius) {
            ctx.beginPath();
            ctx.roundRect(x, y, width, height, radius);
            ctx.closePath();
            ctx.stroke();
        }
        else
            ctx.strokeRect(x, y, width, height);
        ctx.lineWidth = oldwidth;
    };
    clearRect = (x, y, width, height, radius) => {
        const ctx = this.ctx;
        width ??= ctx.canvas.width;
        height ??= ctx.canvas.height;
        if (radius && !Array.isArray(radius) && radius > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.arcTo(x + width, y, x + width, y + height, radius);
            ctx.arcTo(x + width, y + height, x, y + height, radius);
            ctx.arcTo(x, y + height, x, y, radius);
            ctx.arcTo(x, y, x + width, y, radius);
            ctx.closePath();
            ctx.clip();
        }
        else if (radius && Array.isArray(radius)) {
            const [lTop = 0, rTop = 0, lBottom = 0, rBottom = 0] = radius;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x + lTop, y);
            ctx.arcTo(x + width, y, x + width, y + height, rTop);
            ctx.arcTo(x + width, y + height, x, y + height, rBottom);
            ctx.arcTo(x, y + height, x, y, lBottom);
            ctx.arcTo(x, y, x + width, y, lTop);
            ctx.closePath();
            ctx.clip();
        }
        ;
        ctx.clearRect(x, y, width, height);
    };
    drawLines = (lines) => {
        const ctx = this.ctx;
        const drawlines = () => {
            for (let line of lines) {
                line = line?.trim();
                const split = line?.split(":")?.map(x => !isNaN(parseFloat(x)) ? parseFloat(x) : 0);
                const actions = {
                    "bezier": () => ctx.bezierCurveTo(split[1], split[2], split[3], split[4], split[5], split[6]),
                    "quadratic": () => ctx.quadraticCurveTo(split[1], split[2], split[3], split[4])
                };
                if (actions[line?.trim()?.toLowerCase()?.split(":")[0]])
                    actions[line?.trim()?.toLowerCase()?.split(":")[0]]();
                else
                    ctx.lineTo(split[0], split[1]);
            }
            ;
        };
        drawlines();
    };
    measureText = (text, font) => {
        const ctx = this.ctx;
        const oldcolor = ctx.fillStyle, oldfont = ctx.font;
        ctx.fillStyle = "#000000";
        ctx.font = font;
        const metrics = ctx.measureText(text);
        ctx.fillStyle = oldcolor;
        ctx.font = oldfont;
        return metrics;
    };
    filter = (method, filter, value) => {
        const ctx = this.ctx;
        if (filter && typeof filter === "string")
            filter = Filters[filter];
        if (method === FilterMethod.add) {
            if (!filter || !value)
                return;
            const PxOrPerc = filter === Filters.grayscale || filter === Filters.sepia ? "%" :
                (filter === Filters.blur ? "px" : "");
            ctx.filter = util_1.CanvasUtil.parseFilters((ctx.filter === "none" ? "" : ctx.filter) + `${Filters[filter]}(${value + PxOrPerc})`)?.map(x => x?.raw)?.join(" ")?.trim();
        }
        else if (method === FilterMethod.set) {
            if (!filter || !value)
                return;
            const PxOrPerc = filter === Filters.grayscale || filter === Filters.sepia ? "%" :
                (filter === Filters.blur ? "px" : "");
            ctx.filter = `${Filters[filter]}(${value + PxOrPerc})`;
        }
        else if (method === FilterMethod.remove) {
            if (!filter)
                return;
            let filters = util_1.CanvasUtil.parseFilters(ctx.filter);
            const index = filters.findIndex((obj) => obj?.filter === Filters[filter]);
            if (index !== -1)
                filters.splice(index, 1);
            ctx.filter = filters.length > 0 ? filters?.map(x => x?.raw)?.join(" ")?.trim() : "none";
        }
        else if (method === FilterMethod.clear)
            ctx.filter = "none";
        else if (method === FilterMethod.get)
            return ctx.filter;
        else if (method === FilterMethod.parse)
            return util_1.CanvasUtil.parseFilters(ctx.filter);
    };
    setShadow = (blur, color, offset) => {
        const ctx = this.ctx;
        ctx.shadowBlur = blur;
        ctx.shadowColor = color;
        if (offset && !Array.isArray(offset)) {
            ctx.shadowOffsetX = offset;
            ctx.shadowOffsetY = offset;
        }
        else if (offset && Array.isArray(offset)) {
            const [x = 0, y = 0] = offset;
            ctx.shadowOffsetX = x;
            ctx.shadowOffsetY = y;
        }
        ;
    };
    rotate = (angle) => {
        const ctx = this.ctx;
        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;
        ctx.translate(centerX, centerY);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.translate(-centerX, -centerY);
    };
    trim = () => {
        let ctx = this.ctx, canvas = ctx.canvas, pixels = ctx.getImageData(0, 0, canvas.width, canvas.height), l = pixels.data.length, i, bound = {
            top: canvas.height,
            left: canvas.width,
            right: 0,
            bottom: 0
        }, x, y;
        for (i = 0; i < l; i += 4) {
            if (pixels.data[i + 3] === 0)
                continue;
            x = (i / 4) % canvas.width;
            y = Math.floor((i / 4) / canvas.width);
            if (x < bound.left)
                bound.left = x;
            if (y < bound.top)
                bound.top = y;
            if (y > bound.bottom)
                bound.bottom = y;
            if (x > bound.right)
                bound.right = x;
        }
        const height = bound.bottom - bound.top + 1;
        const width = bound.right - bound.left + 1;
        const trimmed = ctx.getImageData(bound.left, bound.top, width, height);
        canvas.width = width;
        canvas.height = height;
        ctx.putImageData(trimmed, 0, 0);
    };
    getPixelColors = async (x, y, width, height) => {
        const ctx = this.ctx;
        width ??= ctx.canvas.width;
        height ??= ctx.canvas.height;
        const data = ctx.getImageData(x, y, width, height).data;
        const colors = [];
        for (let i = 0; i < data.length; i += 4) {
            colors.push(util_1.CanvasUtil.rgbaToHex(data[i], data[i + 1], data[i + 2], data[i + 3] / 255));
        }
        ;
        return colors;
    };
    setPixelsColors = async (x, y, width, height, colors) => {
        const ctx = this.ctx;
        width ??= ctx.canvas.width;
        height ??= ctx.canvas.height;
        const data = ctx.createImageData(width, height);
        colors?.forEach((hex, i) => {
            const colors = util_1.CanvasUtil.hexToRgba(hex);
            i = i * 4;
            data.data[i] = colors.red;
            data.data[i + 1] = colors.green;
            data.data[i + 2] = colors.blue;
            data.data[i + 3] = colors.alpha ?? 255;
        });
        await ctx.putImageData(data, x, y);
    };
    resize = async (width, height) => {
        const ctx = this.ctx, data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        ctx.putImageData(data, 0, 0);
    };
    render = () => this.ctx.canvas.toBuffer("image/png");
}
exports.CanvasBuilder = CanvasBuilder;
;
//# sourceMappingURL=builder.js.map