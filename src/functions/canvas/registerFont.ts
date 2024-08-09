import { GlobalFonts } from "@napi-rs/canvas";
import { AoiFunction, ParamType } from '../../';
import { existsSync, statSync, readdirSync } from "node:fs";
import { join } from "node:path";

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
            checkError: () => "Invalid font source.",
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
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        let [ src, name ] = ctx.params;
        src = join(process.cwd(), src);

        if (await statSync(src).isFile())
            GlobalFonts.registerFromPath(src, name[0]);
        else if (await statSync(src).isDirectory())
            await readdirSync(src)
                .filter(x => [".ttf", ".otf", ".woff", ".woff2"].find(y => x?.endsWith(y)))
                ?.forEach((x, i) => GlobalFonts.registerFromPath(join(src, x), name?.[i]));
        else return ctx.aoiError.fnError(ctx, "custom", {}, "Invalid font source.");

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }    
});