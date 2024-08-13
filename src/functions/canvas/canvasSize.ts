import { AoiFunction, CanvasBuilder, CanvasManager, MeasureTextProperty, ParamType, WidthOrHeight } from '../../';

export default new AoiFunction<"djs">({
    name: "$canvasSize",
    description: "Returns the canvas size.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas.",
            type: ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "property",
            description: "The size property to return.",
            type: ParamType.Enum,
            enum: WidthOrHeight,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [ name, property ] = ctx.params;

        const canvas = name 
            ? ctx.data.canvasManager?.get(name)?.ctx.canvas
            : !name && ctx.data.canvas && ctx.data.canvas instanceof CanvasBuilder 
                ? ctx.data.canvas.ctx.canvas : null;

        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas.");

        const result: Record<string, number> = {
            width: canvas.width,
            height: canvas.height
        };
        data.result = property 
            ? result[MeasureTextProperty[typeof property === "number" ? MeasureTextProperty[property] : property]]
            : JSON.stringify(result);

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }    
});