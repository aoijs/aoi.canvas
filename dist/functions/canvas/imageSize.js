"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("@napi-rs/canvas");
const classes_1 = require("../../classes");
const node_fs_1 = require("node:fs");
exports.default = new classes_1.AoiFunction({
    name: "$imageSize",
    description: "Returns an image size.",
    params: [
        {
            name: "src",
            description: "Path or url to the image.",
            check: async (v, c) => c.checkType(c, { type: classes_1.ParamType.Url }, v)
                || await (0, node_fs_1.existsSync)(v),
            type: classes_1.ParamType.Number,
            typename: "Path | URL"
        },
        {
            name: "property",
            description: "The image size property to return.",
            type: classes_1.ParamType.Enum,
            typename: "\"width\" | \"height\"",
            enum: classes_1.WidthOrHeight,
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
            ? result[typeof property === "number" ? classes_1.WidthOrHeight[property] : property]
            : JSON.stringify(result);
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=imageSize.js.map