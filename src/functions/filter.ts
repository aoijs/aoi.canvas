import { CanvasBuilder, CanvasManager } from "../classes";
import { AoiD } from "../index"

export default {
    name: "$filter",
    code: async (d: AoiD) => {
        let data = d.util.aoiFunc(d);
        let [ canvas = "canvas", method = "get", name, value ] = data.inside.splits;

        if (!d.data.canvases || !(d.data.canvases instanceof CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);

        const res = d.data.canvases.get(canvas)?.filter(method?.trim(), name, parseFloat(value))

        if (typeof res === "string")
            data.result = res;
        else if (typeof res === "object")
            data.result = JSON.stringify(res);

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};