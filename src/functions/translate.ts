import { CanvasBuilder, CanvasManager } from "../classes";
import { AoiD } from "../index"

export default {
    name: "$translate",
    code: async (d: AoiD) => {
        let data = d.util.aoiFunc(d);
        let [ canvas = "canvas", x = "0", y = "0" ] = data.inside.splits;

        if (!d.data.canvases || !(d.data.canvases instanceof CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);

        const cnvas: CanvasBuilder | undefined = d.data.canvases.get(canvas);
        if (!cnvas) return;

        cnvas.getContext()?.translate(parseFloat(x), parseFloat(y));

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};