import { AoiFunction, CanvasBuilder, CanvasManager, CanvasUtil, MeasureTextProperty, ParamType } from "../../classes";

export default new AoiFunction<"djs">({
    name: "$measureText",
    description: "Measures text.",
    params: [
        {
            name: "canvas",
            description: "The name of the canvas to measure text in.",
            type: ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "text",
            description: "The text to measure.",
            type: ParamType.String
        },
        {
            name: "font",
            description: "The text font.",
            type: ParamType.String,
            check: CanvasUtil.isValidFont
        },
        {
            name: "property",
            description: "The result's property to return.",
            type: ParamType.Enum,
            enum: MeasureTextProperty,
            optional: true
        }
    ],
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        const [ name, text, font, property ] = ctx.params;

        const canvas = name 
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof CanvasBuilder 
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;

        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to measure text in.");

        const result = await canvas.measureText(text, font) as Record<string, any>;
        data.result = property 
            ? result[MeasureTextProperty[typeof property === "number" ? MeasureTextProperty[property] : property]]
            : JSON.stringify(result);

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }    
});