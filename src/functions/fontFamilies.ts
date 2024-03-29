import { GlobalFonts } from "@napi-rs/canvas";
import { AoiD } from "../index"

export default {
    name: "$fontFamilies",
    info: {
        description: "Returns all font families/names.",
        parameters: [
            {
                name: "separator",
                description: "The separator.",
                type: "string",
                required: false
            }
        ],
        examples: [
            /*{
                description: "This will create new 512x512 canvas with red rect and then add an attachment. (red.png)",
                code: `$attachCanvas[mycanvas;red.png]
                       $fillRect[mycanvas;#FF0000;0;0;512;512]
                       $createCanvas[mycanvas;512;512]`?.split("\n").map(x => x?.trim()).join("\n"),
                images: []
            }*/
        ]
    },
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