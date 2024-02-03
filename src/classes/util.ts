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
    }

    public static parseFilters = (filters: string) => {
        const result = [];
      
        const regex = /(\w+)\(([^)]+)\)/g;
        let match;
      
        while ((match = regex.exec(filters)) !== null) {
            const [raw, filter, value] = match;
            result.push({ filter, value, raw });
        }
      
        return result;
    }
}