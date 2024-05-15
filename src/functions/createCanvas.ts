import { CanvasManager } from "../classes";
import { AoiD } from "../index"

export default {
    name: "$createCanvas",
    code: async (d: AoiD) => {
        let data = d.util.aoiFunc(d);
        let [ name = "canvas", width = "512", height = "512" ] = data.inside.splits;

        if (!d.data.canvases)
            d.data.canvases = new CanvasManager();

        d.data.canvases.create(name?.trim(), parseFloat(width), parseFloat(height))

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};