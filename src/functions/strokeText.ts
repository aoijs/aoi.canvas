import { GlobalFonts } from "@napi-rs/canvas";
import { CanvasBuilder, CanvasManager } from "../classes";
import { AoiD } from "../index"

export default {
    name: "$strokeText",
    code: async (d: AoiD) => {
        let data = d.util.aoiFunc(d);
        let [ canvas = "canvas", text = "Text", color = "#000000", font = "15px " + GlobalFonts.families?.[0]?.family, x = "0", y = "0", strokeWidth = "10", maxWidth, textAlign, textBaseline ] = data.inside.splits;

        if (!d.data.canvases || !(d.data.canvases instanceof CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);

        if (!d.data.canvases?.get(canvas)?.util.isValidFont(font))
            return d.aoiError.fnError(d, "custom", {}, `Invalid font.`);

        d.data.canvases?.get(canvas)?.strokeText(
            text,
            x,
            y,
            font,
            color,
            parseFloat(strokeWidth),
            parseFloat(maxWidth),
            textAlign,
            textBaseline
        )

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};