import { SKRSContext2D, createCanvas, loadImage, Image } from '@napi-rs/canvas';
import { CanvasUtil } from './util';
import { FilterMethod, Filters } from '../typings';

// Builder
export class CanvasBuilder {
  public ctx: SKRSContext2D;
  public util = CanvasUtil;

  public constructor(width: number, height: number) {
    this.ctx = createCanvas(width, height).getContext("2d");
  };

  public drawImage = async (image: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL, x: number, y: number, width?: number, height?: number, radius?: number | number[]) => {
    image = await loadImage(image, { maxRedirects: 30 });
    width??= image.width;
    height??= image.height;

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
    } else if (radius && Array.isArray(radius)) {
      const [ lTop = 0, rTop = 0, lBottom = 0, rBottom = 0 ] = radius;

      ctx.beginPath();
      ctx.moveTo(x + lTop, y);

      ctx.arcTo(x + width, y, x + width, y + height, rTop);
      ctx.arcTo(x + width, y + height, x, y + height, rBottom);
      ctx.arcTo(x, y + height, x, y, lBottom);
      ctx.arcTo(x, y, x + width, y, lTop);

      ctx.closePath();
      ctx.clip();
    };
    ctx.drawImage(image, x, y, width, height);
    ctx.restore();
  };

  public fillText = (text: string, x: number, y: number, font: string, maxWidth?: number, multiline?: boolean, wrap?: boolean, lineOffset?: number) => {
    let ctx = this.ctx,
        oldfont = ctx.font,
        fontsize = parseInt(font, 10),
        lines = multiline ? text.split("\n") : [text],
        offset = y;

    ctx.font = font;
    lines.forEach(t => {
      if (wrap) {
        let line = "";
        
        t.split(" ").forEach((word, i) => {
          if (maxWidth && ctx.measureText(line + word + " ").width > maxWidth && i > 0) {
            ctx.fillText(line, x, offset, maxWidth);
            line = word + " ";
            offset += fontsize + (lineOffset ?? 0);
          } else line += word + " ";
        });
    
        ctx.fillText(line, x, offset, maxWidth);
        offset += fontsize + (lineOffset ?? 0);
      } else {
        ctx.fillText(t, x, offset, maxWidth);
        offset += fontsize + (lineOffset ?? 0);
      };
    });

    if (!multiline && !wrap)
      ctx.fillText(text, x, y, maxWidth);
    
    ctx.font = oldfont;
  };

  public strokeText = (text: string, x: number, y: number, font: string, width?: number, maxWidth?: number, multiline?: boolean, wrap?: boolean, lineOffset?: number) => {
    let ctx = this.ctx,
        oldfont = ctx.font,
        oldwidth = ctx.lineWidth,
        fontsize = parseInt(font, 10),
        lines = multiline ? text.split("\n") : [text],
        offset = y;

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
          } else line += word + " ";
        });
    
        ctx.strokeText(line, x, offset, maxWidth);
        offset += fontsize + (lineOffset ?? 0);
      } else {
        ctx.strokeText(t, x, offset, maxWidth);
        offset += fontsize + (lineOffset ?? 0);
      };
    });

    if (!multiline && !wrap) 
      ctx.strokeText(text, x, y, maxWidth);
    
    ctx.font = oldfont;
    ctx.lineWidth = oldwidth;
  };

  public fillRect = (x: number, y: number, width?: number, height?: number, radius?: number | number[]) => {
    const ctx = this.ctx;
    width??= ctx.canvas.width;
    height??= ctx.canvas.height;
   
    if (radius) {
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, radius);
      ctx.closePath();
      ctx.fill();
    } else
      ctx.fillRect(x, y, width, height);
  };

  public strokeRect = (x: number, y: number, width?: number, height?: number, strokeWidth?: number, radius?: number | number[]) => {
    const ctx = this.ctx;
    width??= ctx.canvas.width;
    height??= ctx.canvas.height;
    
    const oldwidth = ctx.lineWidth;

    ctx.lineWidth = strokeWidth ?? 10;    
    if (radius) {
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, radius);
      ctx.closePath();
      ctx.stroke();
    } else
      ctx.strokeRect(x, y, width, height);

    ctx.lineWidth = oldwidth;
  };

  public clearRect = (x: number, y: number, width?: number, height?: number, radius?: number[]) => {
    const ctx = this.ctx;
    width??= ctx.canvas.width;
    height??= ctx.canvas.height;
   
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
    } else if (radius && Array.isArray(radius)) {
      const [ lTop = 0, rTop = 0, lBottom = 0, rBottom = 0 ] = radius;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + lTop, y);

      ctx.arcTo(x + width, y, x + width, y + height, rTop);
      ctx.arcTo(x + width, y + height, x, y + height, rBottom);
      ctx.arcTo(x, y + height, x, y, lBottom);
      ctx.arcTo(x, y, x + width, y, lTop);

      ctx.closePath();
      ctx.clip();
    };
    ctx.clearRect(x, y, width, height);
  };

  public measureText = (text: string, font: string) => {
    const ctx = this.ctx

    const oldcolor = ctx.fillStyle,
          oldfont = ctx.font;
    
    ctx.fillStyle = "#000000";
    ctx.font = font;
    
    const metrics = ctx.measureText(text);

    ctx.fillStyle = oldcolor;
    ctx.font = oldfont;

    return metrics;
  };

  public filter = (method: FilterMethod, filter?: Filters, value?: number) => {
    const ctx = this.ctx;

    if (filter && typeof filter === "string")
      filter = Filters[filter] as unknown as Filters;

    if (method === FilterMethod.add) {
      if (!filter || !value) return;

      const PxOrPerc =
          filter === Filters.grayscale || filter === Filters.sepia ? "%" : 
            (filter === Filters.blur ? "px" : "");

      ctx.filter = CanvasUtil.parseFilters((ctx.filter === "none" ? "" : ctx.filter) + `${Filters[filter]}(${value + PxOrPerc})`)?.map(x => x?.raw)?.join(" ")?.trim()
    }
    else if (method === FilterMethod.set) {
      if (!filter || !value) return;

      const PxOrPerc =
          filter === Filters.grayscale || filter === Filters.sepia ? "%" : 
            (filter === Filters.blur ? "px" : "");

      ctx.filter = `${Filters[filter]}(${value + PxOrPerc})`
    }
    else if (method === FilterMethod.remove) {
      if (!filter) return;

      let filters = CanvasUtil.parseFilters(ctx.filter);

      const index = filters.findIndex((obj: { filter: string, raw: string, value: string }) => obj?.filter === Filters[filter])

      if (index !== -1)
        filters.splice(index, 1);

      ctx.filter = filters.length > 0 ? filters?.map(x => x?.raw)?.join(" ")?.trim() : "none"
    }
    else if (method === FilterMethod.clear)
      ctx.filter = "none";
    else if (method === FilterMethod.get)
      return ctx.filter;
    else if (method === FilterMethod.parse)
      return CanvasUtil.parseFilters(ctx.filter);
  };

  public setShadow = (blur: number, color: string, offset?: number | number[]) => {
    const ctx = this.ctx;

    ctx.shadowBlur = blur;
    ctx.shadowColor = color;
    
    if (offset && !Array.isArray(offset)) {
      ctx.shadowOffsetX = offset;
      ctx.shadowOffsetY = offset;
    } else if (offset && Array.isArray(offset)) {
      const [ x = 0, y = 0 ] = offset;

      ctx.shadowOffsetX = x;
      ctx.shadowOffsetY = y;
    };
  };

  public rotate = (angle: number) => {
    const ctx = this.ctx;

    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;

    ctx.translate(centerX, centerY);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);
  };

  public trim = () => {
    let ctx = this.ctx,
        canvas = ctx.canvas,
        pixels = ctx.getImageData(0, 0, canvas.width, canvas.height),
        l = pixels.data.length,
        i,
        bound = {
            top: canvas.height,
            left: canvas.width,
            right: 0,
            bottom: 0
        },
        x, y;

    for (i = 0; i < l; i += 4) {
        if (pixels.data[i + 3] === 0)
            continue;

        x = (i / 4) % canvas.width;
        y = Math.floor((i / 4) / canvas.width);

        if (x < bound.left) bound.left = x;
        if (y < bound.top) bound.top = y;
        if (y > bound.bottom) bound.bottom = y;
        if (x > bound.right) bound.right = x;
    }

    const height = bound.bottom - bound.top + 1;
    const width = bound.right - bound.left + 1;
    const trimmed = ctx.getImageData(bound.left, bound.top, width, height);

    canvas.width = width;
    canvas.height = height;

    ctx.putImageData(trimmed, 0, 0);
  };

  public getPixelColors = async (x: number, y: number, width: number, height: number) => {
    const ctx = this.ctx;
    width??= ctx.canvas.width;
    height??= ctx.canvas.height;

    const data = ctx.getImageData(x, y, width, height).data;
    const colors = [];

    for (let i = 0; i < data.length; i += 4) {
      colors.push(CanvasUtil.rgbaToHex(
        data[i],
        data[i + 1],
        data[i + 2],
        data[i + 3] / 255
      ));
    };

    return colors;
  };

  public setPixelsColors = async (x: number, y: number, width: number, height: number, colors: string[]) => {
    const ctx = this.ctx;
    width??= ctx.canvas.width;
    height??= ctx.canvas.height;

    const data = ctx.createImageData(width, height);

    colors?.forEach((hex, i) => {
      const colors = CanvasUtil.hexToRgba(hex);
      i = i * 4;

      data.data[i] = colors.red;
      data.data[i + 1] = colors.green;
      data.data[i + 2] = colors.blue;
      data.data[i + 3] = colors.alpha ?? 255;
    });
    
    await ctx.putImageData(data, x, y);
  };

  public resize = async (width: number, height: number) => {
    const ctx = this.ctx,
          data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.canvas.width = width;
    ctx.canvas.height = height;
    ctx.putImageData(data, 0, 0);
  };

  public render = () => this.ctx.canvas.toBuffer("image/png");
};