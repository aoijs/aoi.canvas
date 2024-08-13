"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("@napi-rs/canvas");
const __1 = require("../../");
exports.default = new __1.AoiFunction({
    name: "$fontFamilies",
    description: "Returns a list of fonts you can use.",
    params: [
        {
            name: "separator",
            description: "Font seperator.",
            type: __1.ParamType.String,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        data.result = canvas_1.GlobalFonts.families?.map(x => x.family)?.join(ctx.params[0] ?? ", ");
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=fontFamilies.js.map