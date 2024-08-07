"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
exports.default = new classes_1.AoiFunction({
    name: "$canvasSize",
    description: "Returns the canvas size.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas.",
            type: classes_1.ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof classes_1.CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "property",
            description: "The size property to return.",
            type: classes_1.ParamType.Enum,
            enum: classes_1.WidthOrHeight,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [name, property] = ctx.params;
        const canvas = name
            ? ctx.data.canvasManager?.get(name)?.ctx.canvas
            : !name && ctx.data.canvas && ctx.data.canvas instanceof classes_1.CanvasBuilder
                ? ctx.data.canvas.ctx.canvas : null;
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas.");
        const result = {
            width: canvas.width,
            height: canvas.height
        };
        data.result = property
            ? result[classes_1.MeasureTextProperty[typeof property === "number" ? classes_1.MeasureTextProperty[property] : property]]
            : JSON.stringify(result);
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
/*export default {
    name: "$canvasSize",
    code: async (d: AoiD) => {
        let data = d.util.aoiFunc(d);
        let [ canvas = "canvas", property = "width" ] = data.inside.splits;
        property = property?.toLowerCase()?.trim();

        if (!d.data.canvasManager || !(d.data.canvasManager instanceof CanvasManager))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);

        let canvs: any = d.data.canvasManager.get(canvas);

        if (!canvs || !(canvs instanceof CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
        canvs = canvs.ctx?.canvas;

        const properties = {
            width: canvs.width,
            height: canvs.height,
            json: JSON.stringify({ width: canvs.width, height: canvs.height }),
            wxh: canvs.width + "x" + canvs.height
        } as Record<string, any>;

        if (!properties[property])
            return d.aoiError.fnError(d, "custom", {}, `Invalid property.`);

        data.result = properties[property];

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};*/ 
//# sourceMappingURL=canvasSize.js.map