import { GlobalFonts } from "@napi-rs/canvas";
import { AoiFunction, ParamType, registerFonts } from '../../';
import { existsSync, statSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

export default new AoiFunction<"djs">({
    name: "$registerFont",
    description: "Registers a font.",
    params: [
        {
            name: "src",
            description: "The font source.",
            type: ParamType.String,
            check: async (v, c) => 
                await existsSync(join(process.cwd(), v)),
            checkError: (c) => `Invalid font source. ${resolve(process.cwd(), c.params[0])}`,
            typename: "Path | URL",
        },
        {
            name: "name",
            description: "The font name.",
            type: ParamType.String,
            check: (v) => !GlobalFonts.has(v),
            checkError: () => "Font with provided name already exists.",
            rest: true,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        let [ src, name ] = ctx.params;

        registerFonts([{
            src: join(process.cwd(), src),
            name
        }]);

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }    
});