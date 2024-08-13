import { GlobalFonts } from "@napi-rs/canvas";
import { AoiFunction, CanvasBuilder, CanvasManager, CanvasUtil, FillOrStrokeOrClear, ParamType } from '../../';

export default new AoiFunction<"djs">({
    name: "$fillText",
    description: "Draws a text.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas to set the fill style in.",
            type: ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "text",
            description: "The text to draw.",
            type: ParamType.String
        },
        {
            name: "font",
            description: "The text font.",
            type: ParamType.String,
            check: (font) => CanvasUtil.isValidFont(font),
            checkError: () => "Either you provided a non-existent font or incorrect font syntax."
        },
        {
            name: "x",
            description: "The text X coordinate.",
            type: ParamType.Number
        },
        {
            name: "y",
            description: "The text Y coordinate.",
            type: ParamType.Number
        },
        {
            name: "maxWidth",
            description: "Maximum text width.",
            type: ParamType.Number,
            check: (v) => v >= 0,
            checkError: () => "maxWidth must be positive.",
            optional: true
        },
        {
            name: "multiline",
            description: "Indicates if the text should be drawn in multiple lines if it exceeds the maximum width.",
            type: ParamType.Boolean,
            optional: true
        },
        {
            name: "wrap",
            description: "Wraps the text if true.",
            type: ParamType.Boolean,
            optional: true
        },
        {
            name: "lineOffset",
            description: "The line offset.",
            type: ParamType.Number,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [ name, text, font = "15px " + GlobalFonts.families[0].family, x, y, maxWidth, multiline, wrap, offset ] = ctx.params;

        const canvas = name 
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof CanvasBuilder 
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;

        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to draw text on.");

        await canvas.text(
            FillOrStrokeOrClear.fill,
            text,
            x,
            y,
            font,
            maxWidth,
            multiline,
            wrap,
            offset ?? 0
        );

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }    
});