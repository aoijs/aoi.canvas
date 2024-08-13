import { AoiFunction, CanvasBuilder, CanvasManager, ParamType } from '../../';

export default new AoiFunction<"djs">({
    name: "$bezierCurveTo",
    description: "Adds a cubic bezier curve to the currect path.",
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
            name: "startX",
            description: "The X coordinate of the start point.",
            type: ParamType.Number
        },
        {
            name: "startY",
            description: "The Y coordinate of the start point.",
            type: ParamType.Number
        },
        {
            name: "middleX",
            description: "The X coordinate of the mid point.",
            type: ParamType.Number
        },
        {
            name: "middleY",
            description: "The Y coordinate of the mid point.",
            type: ParamType.Number
        },
        {
            name: "endX",
            description: "The X coordinate of the end point.",
            type: ParamType.Number
        },
        {
            name: "endY",
            description: "The Y coordinate of the end point.",
            type: ParamType.Number
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [ name, cX, cY, middleX, middleY, endX, endY ] = ctx.params;

        const canvas = name 
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof CanvasBuilder 
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;

        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to draw the curve on.");

        await canvas.ctx.bezierCurveTo(cX, cY, middleX, middleY, endX, endY);

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});