import { CanvasBuilder, CanvasManager } from "../classes";
import { AoiD } from "../index"

export default {
    name: "$canvasSize",
    code: async (d: AoiD) => {
        let data = d.util.aoiFunc(d);
        let [ canvas = "canvas", property = "width" ] = data.inside.splits;
        property = property?.toLowerCase()?.trim();

        if (!d.data.canvases || !(d.data.canvases instanceof CanvasManager))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);

        let canvs: any = d.data.canvases.get(canvas);

        if (!canvs || !(canvs instanceof CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
        canvs = canvs.getContext()?.canvas;

        const properties = {
            width: canvs.width,
            height: canvs.height,
            json: JSON.stringify({ width: canvs.width, height: canvs.height }),
            wxh: canvs.width + "x" + canvs.height
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