import { GlobalFonts } from "@napi-rs/canvas";
import { AoiD } from "../index"

export default {
    name: "$fontFamilies",
    code: async (d: AoiD) => {
        let data = d.util.aoiFunc(d);
        let [ sep = ", " ] = data.inside.splits;
        
        data.result = GlobalFonts.families?.map(x => x?.family)?.join(sep);

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};