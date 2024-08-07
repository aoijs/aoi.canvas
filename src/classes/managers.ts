import { createCanvas, SKRSContext2D } from "@napi-rs/canvas";
import { CanvasBuilder, GradientType } from "./builder";

const gifencoder = require("gif-encoder-2");

export class Manager<T extends any> {
  public map: Map<string, T>;
  
  constructor() {
    this.map = new Map();
  };

  public remove = (name: string) => 
      this.map.delete(name);

  public set = (name: string, value: T) =>
      this.map.set(name, value);

  public get = (name: string) => this.map.get(name);  
  public all = () => this.map;
};

export class CanvasManager extends Manager<CanvasBuilder> {
  public create = (name: string, width: number, height: number) =>
    this.set(name, new CanvasBuilder(width, height));
};

export class GradientManager extends Manager<CanvasGradient> {
  private ctx: SKRSContext2D;

  constructor() {
    super();
    this.ctx = createCanvas(1, 1).getContext("2d");
  };

  public create = (name: string, type: GradientType, options: number[]) =>
    this.map.set(name, type === GradientType.radial
      ? this.ctx.createRadialGradient(...options as [number, number, number, number, number, number])
      : type === GradientType.conic
        ? this.ctx.createConicGradient(...options as [number, number, number])
        : this.ctx.createLinearGradient(...options as [number, number, number, number]));
};

export class GIFManager extends Manager<typeof gifencoder> {
  public create = (name: string, width: number, height: number, algorithm?: "neuquant" | "octree") =>
    this.set(name, new gifencoder(width, height, algorithm ));
};