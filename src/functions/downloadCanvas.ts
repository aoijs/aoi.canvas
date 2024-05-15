import { CanvasBuilder, CanvasManager } from "../classes";
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { AoiD } from "../index"

export default {
    name: "$downloadCanvas",
    code: async (d: AoiD) => {
        let data = d.util.aoiFunc(d);
        let [ canvas = "canvas", path = "./{canvas}.png" ] = data.inside.splits;

        if (!d.data.canvases || !(d.data.canvases instanceof CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);

        const buffer = d.data.canvases?.get(canvas)?.render();

        if (buffer)
            writeFileSync(join(process.cwd(), path?.replace(/{canvas}/g, canvas)), buffer);

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};