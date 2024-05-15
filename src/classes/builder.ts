import { SKRSContext2D, createCanvas, loadImage, Image } from "@napi-rs/canvas";
import { CanvasUtil } from "./util";

// Stuff
export const Filters: string[] = [ "none", "blur", "sepia", "grayscale", "brightness", "contrast", "invert", "saturate" ];
export type RepeatType = "repeat" | "repeat-x" | "repeat-y" | "no-repeat" | null;

// Builder
export class CanvasBuilder {
  public static ctx: SKRSContext2D
  public static gradients: Map<string, CanvasGradient>
  public util = CanvasUtil

  public constructor(width: number, height: number) {
    CanvasBuilder.ctx = createCanvas(width, height).getContext("2d");
    CanvasBuilder.gradients = new Map()
  }

  public drawImage = async (image: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL, x: number | string, y: number | string, width?: number | string, height?: number | string, radius?: number | number[]) => {
    image = await loadImage(image, { maxRedirects: 30 })
    width??= image.width
    height??= image.height

    const ctx = CanvasBuilder.ctx;

    [x, y, width, height] = [x, y, width, height].map((value, i) => 
      CanvasUtil.inPercentages(ctx.canvas[i === 0 || i === 2 ? 'width' : 'height'], value)
    );
    
    if (radius && !Array.isArray(radius) && radius > 0) {
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      
      ctx.arcTo(x + width, y, x + width, y + height, radius)
      ctx.arcTo(x + width, y + height, x, y + height, radius)
      ctx.arcTo(x, y + height, x, y, radius)
      ctx.arcTo(x, y, x + width, y, radius)
      
      ctx.closePath()
      ctx.clip()
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
    ctx.drawImage(image, x, y, width, height)
    ctx.restore()

    return;
  }

  public fillText = (text: string, x: number | string, y: number | string, font: string, color: string | CanvasGradient, maxWidth?: number, textAlign?: string, textBaseline?: string) => {
    const ctx = CanvasBuilder.ctx;
    [x, y] = [x, y].map((value, i) => 
      CanvasUtil.inPercentages(ctx.canvas[i === 0 ? 'width' : 'height'], value)
    );

    const oldfont = ctx.font
    const oldcolor = ctx.fillStyle
    const oldalign = ctx.textAlign
    const oldbaseline = ctx.textBaseline

    if (typeof color === "string" && color?.trim()?.startsWith("gradient:"))
      color = this.getGradient(color?.trim().split(":").slice(1).join(":")) ?? color;

    ctx.font = font
    ctx.fillStyle = color
    if (textAlign)
      this.setTextAlign(textAlign);
    if (textBaseline)
      ctx.textBaseline = textBaseline as CanvasTextBaseline;
    
    ctx.fillText(text, x, y, maxWidth);
    
    ctx.font = oldfont
    ctx.fillStyle = oldcolor
    ctx.textAlign = oldalign
    ctx.textBaseline = oldbaseline

    return;
  }

  public strokeText = (text: string, x: number | string, y: number | string, font: string, color: string | CanvasGradient, lineWidth?: number, maxWidth?: number, textAlign?: string, textBaseline?: string) => {
    const ctx = CanvasBuilder.ctx;
    [x, y] = [x, y].map((value, i) => 
      CanvasUtil.inPercentages(ctx.canvas[i === 0 ? 'width' : 'height'], value)
    );

    const oldfont = ctx.font
    const oldcolor = ctx.strokeStyle
    const oldwidth = ctx.lineWidth
    const oldalign = ctx.textAlign
    const oldbaseline = ctx.textBaseline

    if (typeof color === "string" && color?.trim()?.startsWith("gradient:"))
      color = this.getGradient(color?.trim().split(":").slice(1).join(":")) ?? color;
    
    ctx.font = font
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth ?? 10
    if (textAlign)
      this.setTextAlign(textAlign);
    if (textBaseline)
      ctx.textBaseline = textBaseline as CanvasTextBaseline;
    
    ctx.strokeText(text, x, y, maxWidth)
    
    ctx.font = oldfont
    ctx.strokeStyle = oldcolor
    ctx.lineWidth = oldwidth
    ctx.textAlign = oldalign
    ctx.textBaseline = oldbaseline

    return;
  }

  public fillRect = (style: string | CanvasGradient | CanvasPattern, x: number | string, y: number | string, width?: number | string, height?: number | string, radius?: number | number[]) => {
    const ctx = CanvasBuilder.ctx;
    width??= ctx.canvas.width;
    height??= ctx.canvas.height;
    [x, y, width, height] = [x, y, width, height].map((value, i) => 
      CanvasUtil.inPercentages(ctx.canvas[i === 0 || i === 2 ? 'width' : 'height'], value)
    );
    
    const oldstyle = ctx.fillStyle

    if (typeof style === "string" && style?.trim()?.startsWith("gradient:"))
      style = this.getGradient(style?.trim().split(":").slice(1).join(":")) ?? style;

    ctx.fillStyle = style
   
    if (radius) {
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, radius);
      ctx.closePath();
      ctx.fill();
    } else
      ctx.fillRect(x, y, width, height);

    ctx.fillStyle = oldstyle

    return;
  }

  public strokeRect = (style: string | CanvasGradient | CanvasPattern, x: number | string, y: number | string, width?: number | string, height?: number | string, strokeWidth?: number, radius?: number | number[]) => {
    const ctx = CanvasBuilder.ctx;
    width??= ctx.canvas.width;
    height??= ctx.canvas.height;
    [x, y, width, height] = [x, y, width, height].map((value, i) => 
      CanvasUtil.inPercentages(ctx.canvas[i === 0 || i === 2 ? 'width' : 'height'], value)
    );
    
    const oldstyle = ctx.strokeStyle
    const oldwidth = ctx.lineWidth

    if (typeof style === "string" && style?.trim()?.startsWith("gradient:"))
      style = this.getGradient(style?.trim().split(":").slice(1).join(":")) ?? style;

    ctx.strokeStyle = style
    ctx.lineWidth = strokeWidth ?? 10
    
    if (radius) {
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, radius);
      ctx.closePath();
      ctx.stroke();
    } else
      ctx.strokeRect(x, y, width, height);

    ctx.strokeStyle = oldstyle
    ctx.lineWidth = oldwidth

    return;
  }

  public clearRect = (x: number | string, y: number | string, width?: number | string, height?: number | string, radius?: number[]) => {
    const ctx = CanvasBuilder.ctx;
    width??= ctx.canvas.width;
    height??= ctx.canvas.height;
    [x, y, width, height] = [x, y, width, height].map((value, i) => 
      CanvasUtil.inPercentages(ctx.canvas[i === 0 || i === 2 ? 'width' : 'height'], value)
    );
   
    if (radius && !Array.isArray(radius) && radius > 0) {
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      
      ctx.arcTo(x + width, y, x + width, y + height, radius)
      ctx.arcTo(x + width, y + height, x, y + height, radius)
      ctx.arcTo(x, y + height, x, y, radius)
      ctx.arcTo(x, y, x + width, y, radius)
      
      ctx.closePath()
      ctx.clip()
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
    ctx.clearRect(x, y, width, height)

    return;
  }

  public drawLines = (type: number, color: string | CanvasGradient, startX: number | string, startY: number | string, lines: string[], strokeWidth?: number) => {
    const ctx = CanvasBuilder.ctx;
    [startX, startY] = [startX, startY].map((value, i) => 
      CanvasUtil.inPercentages(ctx.canvas[i === 0 ? 'width' : 'height'], value)
    );

    if (typeof color === "string" && color?.trim()?.startsWith("gradient:"))
      color = this.getGradient(color?.trim().split(":").slice(1).join(":")) ?? color;

    const drawlines = () => {
      ctx.beginPath()
      ctx.moveTo(startX, startY)

      for (let line of lines) {
        line = line?.trim();
        const split = line?.split(":")?.map(x => !isNaN(parseFloat(x)) ? parseFloat(x) : 0)

        const actions: Record<string, Function> = {
          "move": () => ctx.moveTo(split[1], split[2]),
          "bezier": () => ctx.bezierCurveTo(split[1], split[2], split[3], split[4], split[5], split[6]),
          "quadric": () => ctx.quadraticCurveTo(split[1], split[2], split[3], split[4]),
          "setdash": () => {
            const segments = line?.split(":")[1];
            ctx.setLineDash(JSON.parse(segments));
          }
        };

        if (actions[line?.trim()?.toLowerCase()?.split(":")[0]])
          actions[line?.trim()?.toLowerCase()?.split(":")[0]]();
        else
          ctx.lineTo(split[0], split[1]);
      }
      ctx.closePath();
    }

    if (type === 0) {
      const oldcolor = ctx.strokeStyle

      ctx.fillStyle = color
      ctx.setLineDash([])

      drawlines()
      ctx.fill()
      
      ctx.setLineDash([])
      ctx.fillStyle = oldcolor
    }
    else if (type === 1) {
      const oldcolor = ctx.strokeStyle
      const oldwidth = ctx.lineWidth

      ctx.strokeStyle = color
      ctx.lineWidth = strokeWidth ?? 10
      ctx.setLineDash([])

      drawlines()
      ctx.stroke()

      ctx.setLineDash([])
      ctx.strokeStyle = oldcolor
      ctx.lineWidth = oldwidth
    }

    return;
  }

  public measureText = (text: string, font: string) => {
    const ctx = CanvasBuilder.ctx

    const oldcolor = ctx.fillStyle
    const oldfont = ctx.font
    
    ctx.fillStyle = "#000000"
    ctx.font = font
    
    const res = ctx.measureText(text)

    ctx.fillStyle = oldcolor
    ctx.font = oldfont

    return res;
  }

  public setTextAlign = (align: string) => {
    const ctx = CanvasBuilder.ctx;

    const aligns: Record<string, string> = {
      start: "end",
      right: "left",
      center: "center",
      left: "right",
      end: "start"
    }

    if (aligns[align])
      ctx.textAlign = align as CanvasTextAlign;

    return;
  }

  public filter = (method: string, name?: string, value?: number) => {
    const ctx = CanvasBuilder.ctx

    if (name && !Filters.find(x => x === name))
      return;
    if (value && isNaN(value))
      return;

    if (method === "add") {
      if (!name || !value) return;

      const PxOrPerc =
          name === "grayscale" || name === "sepia" ? "%" : 
            (name === "blur" ? "px" : "");

      ctx.filter = this.util.parseFilters((ctx.filter === "none" ? "" : ctx.filter) + `${name}(${value + PxOrPerc})`)?.map(x => x?.raw)?.join(" ")?.trim()
    }
    else if (method === "set") {
      if (!name || !value) return;

      const PxOrPerc =
          name === "grayscale" || name === "sepia" ? "%" : 
            (name === "blur" ? "px" : "");

      ctx.filter = `${name}(${value + PxOrPerc})`
    }
    else if (method === "remove") {
      if (!name) return;

      let filters = this.util.parseFilters(ctx.filter)

      const index = filters.findIndex((obj: { filter: string, raw: string, value: string }) => obj?.filter === name)

      if (index !== -1)
        filters.splice(index, 1);

      ctx.filter = filters.length > 0 ? filters?.map(x => x?.raw)?.join(" ")?.trim() : "none"
    }
    else if (method === "clear")
      ctx.filter = "none";
    else if (method === "get")
      return ctx.filter;
    else if (method === "parse")
      return this.util.parseFilters(ctx.filter);

    return;
  }

  public createGradient = (name: string, type: number, options: number[]) => {
    const ctx = CanvasBuilder.ctx

    let gradient: CanvasGradient | undefined;

    if (type === 0) {
      if (typeof options[0] !== "number" || typeof options[1] !== "number" || typeof options[2] !== "number" || typeof options[3] !== "number")
        return;

      gradient = ctx.createLinearGradient(
        options[0],
        options[1],
        options[2],
        options[3]
      );
    } else if (type === 1) {
      if(typeof options[0] !== "number" || typeof options[1] !== "number" || typeof options[2] !== "number" || typeof options[3] !== "number" || typeof options[4] !== "number" || typeof options[5] !== "number")
        return;

      gradient = ctx.createRadialGradient(
        options[0],
        options[1],
        options[2],
        options[3],
        options[4],
        options[5]
      )
    } else if (type === 2) {
      if (typeof options[0] !== "number" || typeof options[1] !== "number" || typeof options[2] !== "number")
        return;

      gradient = ctx.createConicGradient(
        options[0],
        options[1],
        options[2]
      )
    }

    if (gradient)
      CanvasBuilder.gradients.set(name, gradient);

    return;
  }

  public addColorStop = (gradient: string, offset: number, color: string) => {
    if (!CanvasBuilder.gradients.has(gradient))
      return;

    CanvasBuilder.gradients.get(gradient)?.addColorStop(offset, color)
    
    return;
  }

  public setShadow = (blur: number, color: string, offset?: number | number[]) => {
    const ctx = CanvasBuilder.ctx

    ctx.shadowBlur = blur
    ctx.shadowColor = color
    
    if (offset && !Array.isArray(offset)) {
      ctx.shadowOffsetX = offset
      ctx.shadowOffsetY = offset
    } else if (offset && Array.isArray(offset)) {
      const [ x = 0, y = 0 ] = offset;

      ctx.shadowOffsetX = x
      ctx.shadowOffsetY = y
    };

    return;
  }

  public rotate = (angle: number) => {
    const ctx = CanvasBuilder.ctx

    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;

    ctx.translate(centerX, centerY);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);

    return;
  }

  public trim = () => {
    let ctx = CanvasBuilder.ctx,
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
  }

  public getPixelsColors = async (x: number | string, y: number | string, width: number | string, height: number | string) => {
    const ctx = CanvasBuilder.ctx;
    width??= ctx.canvas.width;
    height??= ctx.canvas.height;
    [x, y, width, height] = [x, y, width, height].map((value, i) => 
      CanvasUtil.inPercentages(ctx.canvas[i === 0 || i === 2 ? 'width' : 'height'], value)
    );

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
  }

  public setPixelsColors = async (x: number | string, y: number | string, width: number | string, height: number | string, colors: string[]) => {
    const ctx = CanvasBuilder.ctx;
    width??= ctx.canvas.width;
    height??= ctx.canvas.height;
    [x, y, width, height] = [x, y, width, height].map((value, i) => 
      CanvasUtil.inPercentages(ctx.canvas[i === 0 || i === 2 ? 'width' : 'height'], value)
    );

    const data = ctx.createImageData(width, height);

    colors?.forEach((hex, i) => {
      const colors = CanvasUtil.hexToRgba(hex);
      i = i * 4;

      data.data[i] = colors.red;
      data.data[i + 1] = colors.green;
      data.data[i + 2] = colors.blue;
      data.data[i + 3] = colors.alpha;
    });
    console.log(data.data);

    return ctx.putImageData(data, x, y);
  }

  public getContext = (): SKRSContext2D => CanvasBuilder.ctx
  public getGradient = (name: string): CanvasGradient | undefined => CanvasBuilder.gradients.get(name);

  public render = (): Buffer => {
    return CanvasBuilder.ctx.canvas.toBuffer("image/png")
  }
}