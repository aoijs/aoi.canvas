import { CanvasBuilder, CanvasManager } from "../classes";
import { AoiD } from "../index"

export default {
    name: "$translate",
    info: {
        description: "Adds a translation transformation.",
        parameters: [
            {
                name: "canvas",
                description: "The canvas name.",
                type: "string",
                required: true
            },
            {
                name: "x",
                description: "Distance to move in the horizontal direction. Positive values are to the right, and negative to the left.",
                type: "number",
                required: false
            },
            {
                name: "y",
                description: "Distance to move in the vertical direction. Positive values are down, and negative are up.",
                type: "number",
                required: false
            }
        ],
        examples: [
            /*{
                description: "This will make a canvas and then measure text.",
                code: `$measureText[mycanvas;Hello;15px Arial]
                       $createCanvas[mycanvas;300;320]`?.split("\n").map(x => x?.trim()).join("\n"),
                images: []
            }*/
        ]
    },
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