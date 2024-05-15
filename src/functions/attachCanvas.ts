import { CanvasBuilder, CanvasManager } from "../classes";
import { AttachmentBuilder } from "discord.js"
import { AoiD } from "../index"

export default {
    name: "$attachCanvas",
    code: async (d: AoiD) => {
        const data = d.util.aoiFunc(d);
        const [canvas = "canvas", name = `{canvas}.png`] = data.inside.splits;
    
        const canvases = d.data.canvases;
        if (!canvases || !(canvases instanceof CanvasManager)) 
            return d.aoiError.fnError(d, "custom", {}, `No canvases found.`);
    
        const canvs = canvases.get(canvas);
        if (!canvs || !(canvs instanceof CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
    
        const attachment = new AttachmentBuilder(canvs.render(), {
            name: name?.replace(/{canvas}/g, canvas)
        });
    
        d.files.push(attachment);
    
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};