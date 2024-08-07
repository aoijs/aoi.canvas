"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
exports.default = new classes_1.AoiFunction({
    name: "$newRadialGradient",
    description: "Creates a new radial gradient.",
    params: [
        {
            name: "gradient",
            description: "Name of the gradient.",
            type: classes_1.ParamType.String
        },
        {
            name: "x1",
            description: "The X coordinate of the start circle.",
            type: classes_1.ParamType.Number
        },
        {
            name: "y1",
            description: "The Y coordinate of the start circle.",
            type: classes_1.ParamType.Number
        },
        {
            name: "r1",
            description: "The radius of the start circle.",
            check: (x) => x >= 0,
            checkError: () => "The radius must be positive.",
            type: classes_1.ParamType.Number
        },
        {
            name: "x2",
            description: "The X coordinate of the end circle.",
            type: classes_1.ParamType.Number
        },
        {
            name: "y2",
            description: "The Y coordinate of the end circle.",
            type: classes_1.ParamType.Number
        },
        {
            name: "r2",
            description: "The radius of the end circle.",
            check: (x) => x >= 0,
            checkError: () => "The radius must be positive.",
            type: classes_1.ParamType.Number
        },
        {
            name: "stops",
            description: "Color stops of the gradient.",
            type: classes_1.ParamType.String,
            typename: "$addColorStop",
            rest: true,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [name, x1, y1, r1, x2, y2, r2] = ctx.params;
        if (!ctx.data?.colorStops)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No color stops.");
        if (!ctx.data?.gradients)
            ctx.data.gradients = new classes_1.GradientManager;
        if (ctx.data.gradients.get(name))
            return ctx.aoiError.fnError(ctx, "custom", {}, `Gradient with name "${name}" already exists.`);
        ctx.data.gradients.create(name, classes_1.GradientType.radial, [x1, y1, r1, x2, y2, r2]);
        ctx.data.colorStops.forEach(x => ctx.data.gradients?.get(name)?.addColorStop(...x));
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=newRadialGradient.js.map