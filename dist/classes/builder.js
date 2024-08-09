"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasBuilder = void 0;
const canvas_1 = require("@napi-rs/canvas");
const util_1 = require("./util");
const typings_1 = require("../typings");
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
            filter = typings_1.Filters[filter];
        if (method === typings_1.FilterMethod.add) {
            if (!filter || !value)
                return;
            const PxOrPerc = filter === typings_1.Filters.grayscale || filter === typings_1.Filters.sepia ? "%" :
                (filter === typings_1.Filters.blur ? "px" : "");
            ctx.filter = util_1.CanvasUtil.parseFilters((ctx.filter === "none" ? "" : ctx.filter) + `${typings_1.Filters[filter]}(${value + PxOrPerc})`)?.map(x => x?.raw)?.join(" ")?.trim();
        }
        else if (method === typings_1.FilterMethod.set) {
            if (!filter || !value)
                return;
            const PxOrPerc = filter === typings_1.Filters.grayscale || filter === typings_1.Filters.sepia ? "%" :
                (filter === typings_1.Filters.blur ? "px" : "");
            ctx.filter = `${typings_1.Filters[filter]}(${value + PxOrPerc})`;
        }
        else if (method === typings_1.FilterMethod.remove) {
            if (!filter)
                return;
            let filters = util_1.CanvasUtil.parseFilters(ctx.filter);
            const index = filters.findIndex((obj) => obj?.filter === typings_1.Filters[filter]);
            if (index !== -1)
                filters.splice(index, 1);
            ctx.filter = filters.length > 0 ? filters?.map(x => x?.raw)?.join(" ")?.trim() : "none";
        }
        else if (method === typings_1.FilterMethod.clear)
            ctx.filter = "none";
        else if (method === typings_1.FilterMethod.get)
            return ctx.filter;
        else if (method === typings_1.FilterMethod.parse)
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