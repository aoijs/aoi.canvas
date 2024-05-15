import { CanvasManager, CanvasBuilder } from "../classes";
import { AoiD } from "../index";

export default {
    name: "$setPixelsColors",
    code: async (d: AoiD) => {
        let data = d.util.aoiFunc(d);
        let [ canvas = "canvas", x = "0", y = "0", width, height, colors = "[]" ] = data.inside.splits;

        if (!d.data.canvases || !(d.data.canvases instanceof CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found. (canvas)`);

        await d.data.canvases.get(canvas)?.setPixelsColors(
            x,
            y,
            width,
            height,
            JSON.parse(colors)
        );

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};