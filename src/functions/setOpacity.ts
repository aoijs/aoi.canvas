import { CanvasBuilder, CanvasManager } from "../classes";
import { AoiD } from "../index"

export default {
    name: "$setOpacity",
    code: async (d: AoiD) => {
        let data = d.util.aoiFunc(d);
        let [ canvas = "canvas", value = "1" ] = data.inside.splits;

        if (!d.data.canvases || !(d.data.canvases instanceof CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found. (canvas)`);

        const canvas_2 = d.data.canvases.get(canvas);
        if (!canvas_2)
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found. (canvas)`);

        canvas_2.getContext().globalAlpha = value?.endsWith("%") ? parseFloat(value) / 100 : parseFloat(value);

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};