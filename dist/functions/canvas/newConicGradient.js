"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
exports.default = new __1.AoiFunction({
    name: "$newConicGradient",
    description: "Creates a new conic gradient.",
    params: [
        {
            name: "gradient",
            description: "Name of the gradient.",
            type: __1.ParamType.String
        },
        {
            name: "startAngle",
            description: "The angle at which to begin the gradient, in radians. The angle starts from a line going horizontally right from the center, and proceeds clockwise.",
            type: __1.ParamType.Number
        },
        {
            name: "x",
            description: "The X coordinate of the center of the gradient.",
            type: __1.ParamType.Number
        },
        {
            name: "y",
            description: "The Y coordinate of the center of the gradient.",
            type: __1.ParamType.Number
        },
        {
            name: "stops",
            description: "Color stops of the gradient.",
            type: __1.ParamType.String,
            typename: "$addColorStop",
            rest: true,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [name, sAngle, x, y] = ctx.params;
        if (!ctx.data?.colorStops)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No color stops.");
        if (!ctx.data?.gradients)
            ctx.data.gradients = new __1.GradientManager;
        if (ctx.data.gradients.get(name))
            return ctx.aoiError.fnError(ctx, "custom", {}, `Gradient with name "${name}" already exists.`);
        ctx.data.gradients.create(name, __1.GradientType.conic, [sAngle, x, y]);
        ctx.data.colorStops.forEach(x => ctx.data.gradients?.get(name)?.addColorStop(...x));
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=newConicGradient.js.map