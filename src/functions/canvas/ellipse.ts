import { AoiFunction, CanvasBuilder, CanvasManager, ParamType } from '../../';

export default new AoiFunction<"djs">({
    name: "$ellipse",
    description: "Adds an elliptical arc to the current path.",
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
            name: "x",
            description: "The X coordinate of the elliptical arc.",
            type: ParamType.Number
        },
        {
            name: "y",
            description: "The Y coordinate of the elliptical arc.",
            type: ParamType.Number
        },
        {
            name: "radiusX",
            description: "The ellipse's major-axis radius.",
            check: (x) => !!(x >= 0),
            checkError: () => "RadiusX must be positive.",
            type: ParamType.Number
        },
        {
            name: "radiusY",
            description: "The ellipse's minor-axis radius.",
            check: (x) => !!(x >= 0),
            checkError: () => "RadiusY must be positive.",
            type: ParamType.Number
        },
        {
            name: "rotation",
            description: "The rotation of the ellipse, expressed in radians.",
            type: ParamType.Number
        },
        {
            name: "startAngle",
            description: "The eccentric angle at which the ellipse starts, measured clockwise from the positive x-axis and expressed in radians.",
            type: ParamType.Number
        },
        {
            name: "endAngle",
            description: "The eccentric angle at which the ellipse ends, measured clockwise from the positive x-axis and expressed in radians.",
            type: ParamType.Number
        },
        {
            name: "counterclockwise",
            description: "If true, draws the ellipse counterclockwise (anticlockwise).",
            type: ParamType.Boolean,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        let [ name, x, y, rX, rY, rotation, sAngle, eAngle, counterclockwise ] = ctx.params;

        const canvas = name 
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof CanvasBuilder 
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;

        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to add a translation transformation in.");

        canvas.ctx.ellipse(x, y, rX, rY, rotation, sAngle, eAngle, counterclockwise);

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});