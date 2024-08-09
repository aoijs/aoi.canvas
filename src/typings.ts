import { AoiClient, AoiError, Util } from 'aoi.js';
import { BaseChannel, CommandInteraction, AttachmentBuilder } from 'discord.js';
import { CanvasManager, GIFManager, GradientManager, CanvasBuilder } from './classes';
const gifencoder = require('gif-encoder-2');

// Interfaces
export interface AoiD {
    error: Function;
    interpreter: Function;
    client: AoiClient;
    channel: BaseChannel;
    aoiError: typeof AoiError;
    data: {
        canvasManager?: CanvasManager;
        gifManager?: GIFManager;
        gradients?: GradientManager;
        canvas?: CanvasBuilder[];
        gif?: typeof gifencoder[];
        colorStops?: [number, string][];
        interaction: CommandInteraction;
    },
    files: AttachmentBuilder[],
    util: typeof Util
};
export interface Param {
    name: string;
    description: string;
    type: ParamType;
    typename?: string;
    check?: (value: any, ctx: FunctionContext) => boolean | undefined | null | Promise<boolean | undefined | null>;
    checkError?: (value: any, ctx?: FunctionContext) => string;
    enum?: { [i: string | number]: string | number };
    rest?: boolean;
    default?: (ctx: FunctionContext) => any;
    optional?: boolean;
};
export interface FunctionDoc {
    category?: string;
    example?: string;
    src?: string;
    docs?: string;
};
export interface FunctionContext<T = any[]> extends AoiD {
    params: T;
    checkType: (d: AoiD, param: Param, value: string) => any;
};
export interface FunctionData<T extends "aoi.js" | "djs"> {
    name: string;
    description?: string;
    docs?: FunctionDoc;
    params?: Param[];
    code: { "djs": (ctx: FunctionContext) => {}, "aoi.js": string }[T];
};

// Enums

export enum ParamType {
    String,
    Number,
    Integer,
    Boolean,
    Url,
    Enum,
    Color,
    Object,
    Array,
    JSON,
    User,
    Guild,
    Channel,
    Permission
};
export enum textAlign {
    start = "end",
    right = "left",
    center = "center",
    left = "right",
    end = "start"
};
export enum MeasureTextProperty {
  actualBoundingBoxAscent,
  actualBoundingBoxDescent,
  actualBoundingBoxLeft, 
  actualBoundingBoxRight,
  fontBoundingBoxAscent, 
  fontBoundingBoxDescent,
  alphabeticBaseline,
  emHeightAscent,
  emHeightDescent,
  width
};
export enum FilterMethod { add, set, remove, clear, get, parse };
export enum GradientType { linear, radial, conic };
export enum GetOrSet { get, set };
export enum WidthOrHeight { width, height };
export enum Filters { none, blur, sepia, grayscale, brightness, contrast, invert, saturate };
export enum textBaseline { top, hanging, middle, alphabetic, ideographic, bottom };
export enum fillRule { nonzero, evenodd };
export enum lineJoinShape { round, bevel, miter };
export enum compositingOperation {
    "source-over",
    "source-in",
    "source-out",
    "source-atop",
    "destination-over",
    "destination-in",
    "destination-out",
    "destination-atop",
    "lighter",
    "copy",
    "xor",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity"
};

// Types

export type RepeatType = "repeat" | "repeat-x" | "repeat-y" | "no-repeat" | null;