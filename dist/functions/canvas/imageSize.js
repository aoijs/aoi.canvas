"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("@napi-rs/canvas");
const __1 = require("../../");
const node_fs_1 = require("node:fs");
exports.default = new __1.AoiFunction({
    name: "$imageSize",
    description: "Returns an image size.",
    params: [
        {
            name: "src",
            description: "Path or url to the image.",
            check: async (v, c) => c.checkType(c, { type: __1.ParamType.Url }, v)
                || await (0, node_fs_1.existsSync)(v),
            type: __1.ParamType.String,
            typename: "Path | URL"
        },
        {
            name: "property",
            description: "The image size property to return.",
            type: __1.ParamType.Enum,
            enum: __1.WidthOrHeight,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        let [image, property] = ctx.params;
        image = await (0, canvas_1.loadImage)(image, { maxRedirects: 30 });
        const result = {
            width: image.width,
            height: image.height
        };
        data.result = property
            ? result[typeof property === "number" ? __1.WidthOrHeight[property] : property]
            : JSON.stringify(result);
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=imageSize.js.map