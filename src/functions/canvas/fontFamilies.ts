import { GlobalFonts } from "@napi-rs/canvas";
import { AoiFunction, ParamType } from '../../';

export default new AoiFunction<"djs">({
    name: "$fontFamilies",
    description: "Returns a list of fonts you can use.",
    params: [
        {
            name: "separator",
            description: "Font seperator.",
            type: ParamType.String,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);

        data.result = GlobalFonts.families?.map(x => x.family)?.join(ctx.params[0] ?? ", ");

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }    
});