"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasUtil = void 0;
const canvas_1 = require("@napi-rs/canvas");
class CanvasUtil {
    static isValidFont = (font) => {
        if (!font)
            return false;
        const regex = /^\d+px\s(?:['"]?([^'"]+)['"]?|[^\s'"]+)$/;
        if (regex.test(font)) {
            const res = regex.exec(font);
            if (res && res[1])
                return canvas_1.GlobalFonts.has(res[1]);
            else
                return false;
        }
        else
            return false;
    };
    static parseFilters = (filters) => {
        const result = [];
        const regex = /(\w+)\(([^)]+)\)/g;
        let match;
        while ((match = regex.exec(filters)) !== null) {
            const [raw, filter, value] = match;
            result.push({ filter, value, raw });
        }
        return result;
    };
}
exports.CanvasUtil = CanvasUtil;
//# sourceMappingURL=util.js.map