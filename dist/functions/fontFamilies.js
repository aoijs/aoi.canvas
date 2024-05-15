"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("@napi-rs/canvas");
exports.default = {
    name: "$fontFamilies",
    code: async (d) => {
        let data = d.util.aoiFunc(d);
        let [sep = ", "] = data.inside.splits;
        data.result = canvas_1.GlobalFonts.families?.map(x => x?.family)?.join(sep);
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=fontFamilies.js.map