import { CanvasBuilder, CanvasManager } from "../classes";
import { AoiD } from "../index"

export default {
    name: "$drawLines",
    code: async (d: AoiD) => {
        let data = d.util.aoiFunc(d);
        let [ canvas = "canvas", type = "1", color = "#000000", strokeWidth = "10", x = "0", y = "0", ...lines ] = data.inside.splits;

        if (!d.data.canvases || !(d.data.canvases instanceof CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);

        if (type?.toLowerCase()?.trim() === "draw") 
            type = "1";
        else if (type?.toLowerCase()?.trim() === "fill")
            type = "0";

        if (lines && lines.length > 0)
            d.data.canvases?.get(canvas)?.drawLines(
                parseFloat(type),
                color,
                x,
                y,
                lines,
                parseFloat(strokeWidth)
            );

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};