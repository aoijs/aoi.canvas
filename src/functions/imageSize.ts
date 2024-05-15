import { loadImage } from "@napi-rs/canvas";
import { AoiD } from "../index";

export default {
    name: "$imageSize",
    code: async (d: AoiD) => {
        let data = d.util.aoiFunc(d);
        let [ image, property = "width" ] = data.inside.splits;

        if (!image)
            return d.aoiError.fnError(d, "custom", {}, `No image src provided.`);

        if (image?.startsWith("https#COLON#//")) image = image.addBrackets();
        image = await loadImage(image, { maxRedirects: 30 });

        const properties = {
            width: image.width,
            height: image.height,
            json: JSON.stringify({ width: image.width, height: image.height }),
            wxh: image.width + "x" + image.height
        } as Record<string, any>;

        if (!properties[property])
            return d.aoiError.fnError(d, "custom", {}, `Invalid property.`);

        data.result = properties[property];

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};