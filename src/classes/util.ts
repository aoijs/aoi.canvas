import { GlobalFonts } from "@napi-rs/canvas";

export class CanvasUtil {
    public static isValidFont = (font: string) => {
        if (!font)
            return false;
      
        const regex = /^\d+px\s(?:['"]?([^'"]+)['"]?|[^\s'"]+)$/;
        if (regex.test(font)) {
            const res = regex.exec(font)
          
            if (res && res[1])
                return GlobalFonts.has(res[1]);
            else
                return false;
        } else
            return false;
    };

    public static parseFilters = (filters: string) => {
        const result = [];
      
        const regex = /(\w+)\(([^)]+)\)/g;
        let match;
      
        while ((match = regex.exec(filters)) !== null) {
            const [raw, filter, value] = match;
            result.push({ filter, value, raw });
        }
      
        return result;
    };

    public static rgbaToHex = (r: number, g: number, b: number, a?: number) => 
        "#" + r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0") + (a && a !== undefined ? Math.round(a as number * 255).toString(16).padStart(2, "0") : "");

    public static hexToRgba = (hex: string) => 
        ({ 
            red: parseInt(hex.slice(1, 3), 16),
            green: parseInt(hex.slice(3, 5), 16),
            blue: parseInt(hex.slice(5, 7), 16),
            alpha: hex.length === 9 ? parseInt(hex.slice(7, 9), 16) : undefined
        });
};