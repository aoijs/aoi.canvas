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
    width;
    height;
    constructor(width, height) {
        this.ctx = (0, canvas_1.createCanvas)(width, height).getContext('2d');
        this.width = width;
        this.height = height;
    }
    ;
    rect(type, x, y, width, height, a, b) {
        const ctx = this.ctx;
        width ??= ctx.canvas.width;
        height ??= ctx.canvas.height;
        if (type === typings_1.FillOrStrokeOrClear.none)
            return ctx.roundRect(x, y, width, height, a);
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, type !== typings_1.FillOrStrokeOrClear.stroke ? a : b);
        ({
            [typings_1.FillOrStrokeOrClear.clear]: () => ctx.clearRect(x, y, width, height),
            [typings_1.FillOrStrokeOrClear.fill]: () => ctx.fill(),
            [typings_1.FillOrStrokeOrClear.stroke]: () => {
                ctx.lineWidth = a;
                ctx.stroke();
            }
        })[type]();
        ctx.restore();
    }
    ;
    async text(type, text, x, y, font, a, b, c, d, e) {
        const ctx = this.ctx, optional = [a, b, c, d, e], [strokeWidth, maxWidth, multiline, wrap, lineOffset] = (type === typings_1.FillOrStrokeOrClear.fill ? [undefined, ...optional.slice(0, -1)] : optional), oldfont = ctx.font, oldStrokeWidth = ctx.lineWidth, fontsize = parseFloat(util_1.fontRegex.exec(font)[4]), lines = multiline ? text.split('\n') : [text], func = async (text, x, y, maxWidth) => type === typings_1.FillOrStrokeOrClear.fill
            ? await ctx.fillText(text, x, y, maxWidth)
            : await ctx.strokeText(text, x, y, maxWidth);
        let offset = y;
        ctx.lineWidth = strokeWidth ?? oldStrokeWidth;
        ctx.font = font;
        if (multiline || wrap) {
            lines.forEach(t => {
                if (wrap) {
                    let line = '';
                    t.split(' ').forEach((word, i) => {
                        if (maxWidth && ctx.measureText(line + word + ' ').width > maxWidth && i > 0) {
                            func(line, x, offset, maxWidth);
                            line = word + ' ';
                            offset += fontsize + (lineOffset ?? 0);
                        }
                        else
                            line += word + ' ';
                    });
                    func(line, x, offset, maxWidth);
                    offset += fontsize + (lineOffset ?? 0);
                }
                else {
                    func(t, x, offset, maxWidth);
                    offset += fontsize + (lineOffset ?? 0);
                }
                ;
            });
        }
        else
            func(text, x, y, maxWidth);
        ctx.lineWidth = oldStrokeWidth;
        ctx.font = oldfont;
    }
    ;
    async drawImage(image, x, y, width, height, radius) {
        const ctx = this.ctx;
        image = await (0, canvas_1.loadImage)(image, { maxRedirects: 30 });
        width ??= image.width;
        height ??= image.height;
        if (!radius)
            return ctx.drawImage(image, x, y, width, height);
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);
        ctx.clip();
        ctx.drawImage(image, x, y, width, height);
        ctx.restore();
    }
    ;
    measureText(text, font) {
        const ctx = this.ctx, oldcolor = ctx.fillStyle, oldfont = ctx.font;
        ctx.fillStyle = '#000000';
        ctx.font = font;
        const metrics = ctx.measureText(text);
        ctx.fillStyle = oldcolor;
        ctx.font = oldfont;
        return metrics;
    }
    ;
    filter(method, filter, value) {
        const ctx = this.ctx;
        if (filter && typeof filter === 'string')
            filter = typings_1.Filters[filter];
        if (method === typings_1.FilterMethod.add) {
            if (!filter || !value)
                return;
            const PxOrPerc = filter === typings_1.Filters.grayscale || filter === typings_1.Filters.sepia ? '%' :
                (filter === typings_1.Filters.blur ? 'px' : '');
            ctx.filter = util_1.CanvasUtil.parseFilters((ctx.filter === 'none' ? '' : ctx.filter) + `${typings_1.Filters[filter]}(${value + PxOrPerc})`)?.map(x => x?.raw)?.join(' ')?.trim();
        }
        else if (method === typings_1.FilterMethod.set) {
            if (!filter || !value)
                return;
            const PxOrPerc = filter === typings_1.Filters.grayscale || filter === typings_1.Filters.sepia ? '%' :
                (filter === typings_1.Filters.blur ? 'px' : '');
            ctx.filter = `${typings_1.Filters[filter]}(${value + PxOrPerc})`;
        }
        else if (method === typings_1.FilterMethod.remove) {
            if (!filter)
                return;
            let filters = util_1.CanvasUtil.parseFilters(ctx.filter);
            const index = filters.findIndex((obj) => obj?.filter === typings_1.Filters[filter]);
            if (index !== -1)
                filters.splice(index, 1);
            ctx.filter = filters.length > 0 ? filters?.map(x => x?.raw)?.join(' ')?.trim() : 'none';
        }
        else if (method === typings_1.FilterMethod.clear)
            ctx.filter = 'none';
        else if (method === typings_1.FilterMethod.get)
            return ctx.filter;
        else if (method === typings_1.FilterMethod.parse)
            return util_1.CanvasUtil.parseFilters(ctx.filter);
    }
    ;
    setShadow(blur, color, offset) {
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
    }
    ;
    rotate(angle) {
        const ctx = this.ctx;
        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;
        ctx.translate(centerX, centerY);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.translate(-centerX, -centerY);
    }
    ;
    trim() {
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
    }
    ;
    getPixelColors(x, y, width, height) {
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
    }
    ;
    setPixelsColors(x, y, width, height, colors) {
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
        ctx.putImageData(data, x, y);
    }
    ;
    resize(width, height) {
        const ctx = this.ctx, data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        ctx.putImageData(data, 0, 0);
    }
    ;
    get buffer() { return this.ctx.canvas.toBuffer('image/png'); }
    ;
}
exports.CanvasBuilder = CanvasBuilder;
;
//# sourceMappingURL=builder.js.map