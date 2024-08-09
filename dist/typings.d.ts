import { AoiClient, AoiError, Util } from 'aoi.js';
import { BaseChannel, CommandInteraction, AttachmentBuilder } from 'discord.js';
import { CanvasManager, GIFManager, GradientManager, CanvasBuilder } from './classes';
declare const gifencoder: any;
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
    };
    files: AttachmentBuilder[];
    util: typeof Util;
}
export interface Param {
    name: string;
    description: string;
    type: ParamType;
    typename?: string;
    check?: (value: any, ctx: FunctionContext) => boolean | undefined | null | Promise<boolean | undefined | null>;
    checkError?: (value: any, ctx?: FunctionContext) => string;
    enum?: {
        [i: string | number]: string | number;
    };
    rest?: boolean;
    default?: (ctx: FunctionContext) => any;
    optional?: boolean;
}
export interface FunctionDoc {
    category?: string;
    example?: string;
    src?: string;
    docs?: string;
}
export interface FunctionContext<T = any[]> extends AoiD {
    params: T;
    checkType: (d: AoiD, param: Param, value: string) => any;
}
export interface FunctionData<T extends "aoi.js" | "djs"> {
    name: string;
    description?: string;
    docs?: FunctionDoc;
    params?: Param[];
    code: {
        "djs": (ctx: FunctionContext) => {};
        "aoi.js": string;
    }[T];
}
export declare enum ParamType {
    String = 0,
    Number = 1,
    Integer = 2,
    Boolean = 3,
    Url = 4,
    Enum = 5,
    Color = 6,
    Object = 7,
    Array = 8,
    JSON = 9,
    User = 10,
    Guild = 11,
    Channel = 12,
    Permission = 13
}
export declare enum textAlign {
    start = "end",
    right = "left",
    center = "center",
    left = "right",
    end = "start"
}
export declare enum MeasureTextProperty {
    actualBoundingBoxAscent = 0,
    actualBoundingBoxDescent = 1,
    actualBoundingBoxLeft = 2,
    actualBoundingBoxRight = 3,
    fontBoundingBoxAscent = 4,
    fontBoundingBoxDescent = 5,
    alphabeticBaseline = 6,
    emHeightAscent = 7,
    emHeightDescent = 8,
    width = 9
}
export declare enum FilterMethod {
    add = 0,
    set = 1,
    remove = 2,
    clear = 3,
    get = 4,
    parse = 5
}
export declare enum GradientType {
    linear = 0,
    radial = 1,
    conic = 2
}
export declare enum GetOrSet {
    get = 0,
    set = 1
}
export declare enum WidthOrHeight {
    width = 0,
    height = 1
}
export declare enum Filters {
    none = 0,
    blur = 1,
    sepia = 2,
    grayscale = 3,
    brightness = 4,
    contrast = 5,
    invert = 6,
    saturate = 7
}
export declare enum textBaseline {
    top = 0,
    hanging = 1,
    middle = 2,
    alphabetic = 3,
    ideographic = 4,
    bottom = 5
}
export declare enum fillRule {
    nonzero = 0,
    evenodd = 1
}
export declare enum lineJoinShape {
    round = 0,
    bevel = 1,
    miter = 2
}
export declare enum compositingOperation {
    "source-over" = 0,
    "source-in" = 1,
    "source-out" = 2,
    "source-atop" = 3,
    "destination-over" = 4,
    "destination-in" = 5,
    "destination-out" = 6,
    "destination-atop" = 7,
    "lighter" = 8,
    "copy" = 9,
    "xor" = 10,
    "multiply" = 11,
    "screen" = 12,
    "overlay" = 13,
    "darken" = 14,
    "lighten" = 15,
    "color-dodge" = 16,
    "color-burn" = 17,
    "hard-light" = 18,
    "soft-light" = 19,
    "difference" = 20,
    "exclusion" = 21,
    "hue" = 22,
    "saturation" = 23,
    "color" = 24,
    "luminosity" = 25
}
export type RepeatType = "repeat" | "repeat-x" | "repeat-y" | "no-repeat" | null;
export {};
//# sourceMappingURL=typings.d.ts.map