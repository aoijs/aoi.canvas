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
    static rgbaToHex = (r, g, b, a) => "#" + r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0") + Math.round(a * 255).toString(16).padStart(2, "0");
    static hexToRgba = (hex) => ({
        red: parseInt(hex.slice(1, 3), 16),
        green: parseInt(hex.slice(3, 5), 16),
        blue: parseInt(hex.slice(5, 7), 16),
        alpha: hex.length === 9 ? parseInt(hex.slice(7, 9), 16) : 0
    });
    static inPercentages = (Of, value) => typeof value === "string" && value.endsWith("%")
        ? parseInt(value) / 100 * Of
        : (typeof value === "string"
            ? parseInt(value)
            : value);
}
exports.CanvasUtil = CanvasUtil;
//# sourceMappingURL=util.js.map