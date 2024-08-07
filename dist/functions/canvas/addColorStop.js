"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
exports.default = new classes_1.AoiFunction({
    name: "$addColorStop",
    description: "Adds a color stop to the gradient.",
    params: [
        {
            name: "gradient",
            description: "Name of the gradient.",
            type: classes_1.ParamType.String,
            check: (v, c) => !!(c.data.gradients && c.data.gradients instanceof classes_1.GradientManager && c.data.gradients.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true,
        },
        {
            name: "offset",
            description: "The color stop offset.",
            check: (v) => v / 100 >= 0 && v / 100 <= 1,
            type: classes_1.ParamType.Number
        },
        {
            name: "color",
            description: "Color of the stop.",
            type: classes_1.ParamType.Color
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [name, offset, color] = ctx.params;
        const gradient = name ? ctx.data.gradients?.get(name) : null;
        if (!gradient) {
            ctx.data.colorStops = ctx.data?.colorStops
                ? [...ctx.data.colorStops, [offset / 100, color]]
                : [[offset / 100, color]];
        }
        else
            gradient.addColorStop(offset, color);
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=addColorStop.js.map