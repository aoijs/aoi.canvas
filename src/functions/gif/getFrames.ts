import { AoiFunction, CanvasUtil, GIFManager, Param, ParamType } from "../../classes";
import { existsSync } from "node:fs";
const gifframes = require("gif-frames");

export default new AoiFunction<"djs">({
    name: "$getFrames",
    description: "Extracts frames from a gif.",
    params: [
        {
            name: "src",
            description: "The gif.",
            type: ParamType.String,
            check: async (v, c) => 
                c.checkType(c, { type: ParamType.Url } as Param, v)
                || await existsSync(v) || (v.startsWith("gif:")
                    && c.data.gifManager && c.data.canvasManager instanceof GIFManager && c.data.gifManager.get(v.split("gif:").slice(1).join(":"))),
            optional: true
        },
        {
            name: "amount",
            description: "The amount of frames to extract.",
            type: ParamType.Number,
            check: (v) => v > 0,
            optional: true
        }
    ],
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        let [ src, amount ] = ctx.params;

        if (src.startsWith("gif:"))
            src = ctx.data.gifManager?.get(src.split("gif:").slice(1).join(":")).out.getData();

        data.result = JSON.stringify(
            await gifframes({ url: src, frames: amount ? amount - 1 : "all", outputType: "png" })
                .then((data: any) => data.map((x: any) => {
                    const data = x.getImage().data;
                    const colors = [];

                    for (let i = 0; i < data.length; i += 4) {
                        colors.push(CanvasUtil.rgbaToHex(
                            data[i] ?? 0,
                            data[i + 1] ?? 0,
                            data[i + 2] ?? 0,
                            (data[i + 3] ?? 0) / 255
                        ));
                    };

                    return colors;
                })) ?? []
        ); 

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});