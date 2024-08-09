import { GlobalFonts } from "@napi-rs/canvas";

export const fontRegex = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-,\"\sa-z]+?)\s*$/i

export class CanvasUtil {
    public static isValidFont = (font: string) => {
        if (!font)
            return false;
      
        if (fontRegex.test(font)) {
            const res = fontRegex.exec(font)
          
            if (res && res[0]) {
                const families = res[6].split(',').map(x => x?.trim());

                if (families) {
                    for (const family of families) {
                        if (!GlobalFonts.has(family.replace(/['",]/g, '')))
                            return false;
                    };
                };

                return true;
            };
            return false;
        };
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