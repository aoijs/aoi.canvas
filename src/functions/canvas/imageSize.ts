import { loadImage } from "@napi-rs/canvas";
import { AoiFunction, Param, ParamType, WidthOrHeight } from "../../classes";
import { existsSync } from "node:fs";

export default new AoiFunction<"djs">({
    name: "$imageSize",
    description: "Returns an image size.",
    params: [
        {
            name: "src",
            description: "Path or url to the image.",
            check: async (v, c) => 
                c.checkType(c, { type: ParamType.Url } as Param, v)
                || await existsSync(v),
            type: ParamType.Number,
            typename: "Path | URL"
        },
        {
            name: "property",
            description: "The image size property to return.",
            type: ParamType.Enum,
            typename: "\"width\" | \"height\"",
            enum: WidthOrHeight,
            optional: true
        }
    ],
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        let [ image, property ] = ctx.params;
        image = await loadImage(image, { maxRedirects: 30 });

        const result: Record<string, any> = {
            width: image.width,
            height: image.height
        };
        
        data.result = property 
            ? result[typeof property === "number" ? WidthOrHeight[property] : property]
            : JSON.stringify(result);

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});