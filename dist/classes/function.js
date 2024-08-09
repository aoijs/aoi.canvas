"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AoiFunction = void 0;
const util_1 = require("./util");
const discord_js_1 = require("discord.js");
const typings_1 = require("../typings");
const Colors = {
    White: "#ffffff",
    Aqua: "#1abc9c",
    Green: "#57f287",
    Blue: "#3498db",
    Yellow: "#fee75c",
    Purple: "#9b59b6",
    LuminousVividPink: "#e91e63",
    Fuchsia: "#eb459e",
    Gold: "#f1c40f",
    Orange: "#e67e22",
    Red: "#ed4245",
    RubberDuck: "#FFD700",
    Grey: "#95a5a6",
    Navy: "#34495e",
    DarkAqua: "#11806a",
    DarkGreen: "#1f8b4c",
    DarkBlue: "#206694",
    DarkPurple: "#71368a",
    DarkVividPink: "#ad1457",
    DarkGold: "#c27c0e",
    DarkOrange: "#a84300",
    DarkRed: "#992d22",
    DarkGrey: "#979c9f",
    DarkerGrey: "#7f8c8d",
    LightGrey: "#bcc0c0",
    DarkNavy: "#2c3e50",
    Blurple: "#5865f2",
    Greyple: "#99aab5",
    DarkButNotBlack: "#2c2f33",
    NotQuiteBlack: "#23272a"
};
const Permissions = {
    createinvite: discord_js_1.PermissionsBitField["Flags"].CreateInstantInvite,
    createinstantinvite: discord_js_1.PermissionsBitField["Flags"].CreateInstantInvite,
    kickmembers: discord_js_1.PermissionsBitField["Flags"].KickMembers,
    banmembers: discord_js_1.PermissionsBitField["Flags"].BanMembers,
    administrator: discord_js_1.PermissionsBitField["Flags"].Administrator,
    managechannels: discord_js_1.PermissionsBitField["Flags"].ManageChannels,
    manageguild: discord_js_1.PermissionsBitField["Flags"].ManageGuild,
    addreactions: discord_js_1.PermissionsBitField["Flags"].AddReactions,
    viewauditlog: discord_js_1.PermissionsBitField["Flags"].ViewAuditLog,
    priorityspeaker: discord_js_1.PermissionsBitField["Flags"].PrioritySpeaker,
    stream: discord_js_1.PermissionsBitField["Flags"].Stream,
    viewchannel: discord_js_1.PermissionsBitField["Flags"].ViewChannel,
    sendmessages: discord_js_1.PermissionsBitField["Flags"].SendMessages,
    sendttsmessages: discord_js_1.PermissionsBitField["Flags"].SendTTSMessages,
    managemessages: discord_js_1.PermissionsBitField["Flags"].ManageMessages,
    embedlinks: discord_js_1.PermissionsBitField["Flags"].EmbedLinks,
    attachfiles: discord_js_1.PermissionsBitField["Flags"].AttachFiles,
    readmessagehistory: discord_js_1.PermissionsBitField["Flags"].ReadMessageHistory,
    mentioneveryone: discord_js_1.PermissionsBitField["Flags"].MentionEveryone,
    useexternalemojis: discord_js_1.PermissionsBitField["Flags"].UseExternalEmojis,
    viewguildinsights: discord_js_1.PermissionsBitField["Flags"].ViewGuildInsights,
    connect: discord_js_1.PermissionsBitField["Flags"].Connect,
    speak: discord_js_1.PermissionsBitField["Flags"].Speak,
    mute: discord_js_1.PermissionsBitField["Flags"].MuteMembers,
    mutemembers: discord_js_1.PermissionsBitField["Flags"].MuteMembers,
    deafen: discord_js_1.PermissionsBitField["Flags"].DeafenMembers,
    deafenmembers: discord_js_1.PermissionsBitField["Flags"].MuteMembers,
    movemembers: discord_js_1.PermissionsBitField["Flags"].MoveMembers,
    usevad: discord_js_1.PermissionsBitField["Flags"].UseVAD,
    changenickname: discord_js_1.PermissionsBitField["Flags"].ChangeNickname,
    managenicknames: discord_js_1.PermissionsBitField["Flags"].ManageNicknames,
    manageroles: discord_js_1.PermissionsBitField["Flags"].ManageRoles,
    managewebhooks: discord_js_1.PermissionsBitField["Flags"].ManageWebhooks,
    manageemojisandstickers: discord_js_1.PermissionsBitField["Flags"].ManageEmojisAndStickers,
    manageguildexpressions: discord_js_1.PermissionsBitField["Flags"].ManageGuildExpressions,
    requesttospeak: discord_js_1.PermissionsBitField["Flags"].RequestToSpeak,
    manageevents: discord_js_1.PermissionsBitField["Flags"].ManageEvents,
    managethreads: discord_js_1.PermissionsBitField["Flags"].ManageThreads,
    createpublicthreads: discord_js_1.PermissionsBitField["Flags"].CreatePublicThreads,
    createprivatethreads: discord_js_1.PermissionsBitField["Flags"].CreatePrivateThreads,
    useexternalsticker: discord_js_1.PermissionsBitField["Flags"].UseExternalStickers,
    sendmessagesinthreads: discord_js_1.PermissionsBitField["Flags"].SendMessagesInThreads,
    useembeddedactivities: discord_js_1.PermissionsBitField["Flags"].UseEmbeddedActivities,
    moderatemembers: discord_js_1.PermissionsBitField["Flags"].ModerateMembers,
    useapplicationcommands: discord_js_1.PermissionsBitField["Flags"].UseApplicationCommands,
    viewcreatormonetizationanalytics: discord_js_1.PermissionsBitField["Flags"].ViewCreatorMonetizationAnalytics,
    usesoundboard: discord_js_1.PermissionsBitField["Flags"].UseSoundboard,
    useexternalsounds: discord_js_1.PermissionsBitField["Flags"].UseExternalSounds,
    sendvoicemessages: discord_js_1.PermissionsBitField["Flags"].SendVoiceMessages,
    sendpolls: discord_js_1.PermissionsBitField["Flags"].SendPolls,
    all: Object.keys(discord_js_1.PermissionsBitField["Flags"])
};
const rgbaRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(\s*,\s*(0|1|0?\.\d+))?\s*\)$/;
const isJSON = (value, check) => {
    try {
        const obj = JSON.parse(value);
        return check ? (check(obj) ? obj : null) : obj;
    }
    catch (e) {
        return null;
    }
};
const checkType = async (d, param, value) => {
    const types = {
        "0": () => value,
        "1": () => !isNaN(parseFloat(value)) ? parseFloat(value) : null,
        "2": () => Number.isInteger(parseFloat(value)) ? parseInt(value) : null,
        "3": () => ["true", "false"].includes(value.toLowerCase()) ? value.toLowerCase() === "true" : null,
        "4": () => { try {
            new URL(value);
            return value;
        }
        catch (e) {
            return undefined;
        } },
        "5": () => param.enum ? param.enum[value] : undefined,
        "6": () => /^#?([0-9A-Fa-f]{3,4}){1,2}$/.test(value) ? value
            : (rgbaRegex.test(value) ? (() => {
                const match = value.match(rgbaRegex);
                return util_1.CanvasUtil.rgbaToHex(parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10), match[5] ? parseFloat(match[5]) : undefined);
            })() : Colors[value]),
        "7": () => isJSON(value, (obj) => !Array.isArray(obj)),
        "8": () => isJSON(value, (obj) => Array.isArray(obj)),
        "9": () => isJSON(value),
        "10": async () => await d.client.users.fetch(value).catch(() => null),
        "11": async () => await d.client.guilds.fetch(value).catch((e) => null),
        "12": async () => await d.client.channels.fetch(value).catch((e) => null),
        "13": () => Permissions[value],
    };
    return await types[`${param.type}`]();
};
class AoiFunction {
    data;
    constructor(data) {
        this.data = data;
    }
    ;
    register(client) {
        client.functionManager.createFunction({
            name: this.data.name,
            type: typeof this.data.code === "string" ? "aoi.js" : "djs",
            params: typeof this.data.code === "string" && this.data.params ? this.data.params.map((param) => param.name) : undefined,
            code: typeof this.data.code === "string" ? this.data.code : async (d) => {
                let data = d.util.aoiFunc(d);
                let params = data.inside.splits.map((x) => x?.trim() ?? null);
                let context = {
                    ...d,
                    params: [],
                    checkType
                };
                if (this.data.params) {
                    if (!this.data.params.find(x => x.rest) && params.length > this.data.params.length)
                        return d.aoiError.fnError(d, "custom", {}, "Too many fields.");
                    let i = 0;
                    let minus = 0;
                    while (i < this.data.params.length) {
                        const value = params[i - minus];
                        const param = this.data.params[i];
                        if (!param.optional && (value === undefined || value === null || value.length === 0))
                            return d.aoiError.fnError(d, "custom", {}, `${param.name.charAt(0).toUpperCase() + param.name.slice(1)} field cannot be empty.`);
                        if (param.rest) {
                            const rest = [];
                            for (let ri = i - minus; ri < params.length; ri++) {
                                const rvalue = params[ri];
                                if (param.optional && (rvalue === undefined || rvalue === null || rvalue.length === 0)) {
                                    rest.push(param?.default ? await param.default(context) : null);
                                    continue;
                                }
                                ;
                                const r = await checkType(d, param, rvalue);
                                const check = param.check && !await param.check(r, context);
                                if ((r === undefined || r === null) || check)
                                    return d.aoiError.fnError(d, "custom", {}, check && param.checkError
                                        ? await param.checkError(rvalue, context)
                                        : `Invalid ${param.name.charAt(0).toUpperCase() + param.name.slice(1)} value.`);
                                rest.push(r);
                            }
                            ;
                            context.params.push(rest);
                            break;
                        }
                        ;
                        if (value === undefined || value === null || value.length === 0) {
                            context.params.push(param?.default ? await param.default(context) : null);
                            i++;
                            continue;
                        }
                        ;
                        const r = await checkType(d, param, value);
                        const check = param.check && !await param.check(r, context);
                        if ((r === undefined || r === null) || check) {
                            if (param.optional && this.data.params[i + 1]) {
                                const nextparam = this.data.params[i + 1];
                                const nextr = await checkType(d, nextparam, value);
                                const nextcheck = nextparam.check && await nextparam.check(r, context);
                                if ((nextr !== undefined && nextr !== null) || nextcheck) {
                                    context.params.push(param.default ? await param.default(context) : null, nextr);
                                    i += 2;
                                    minus++;
                                    continue;
                                }
                                ;
                            }
                            ;
                            return d.aoiError.fnError(d, "custom", {}, check && param.checkError
                                ? await param.checkError(value, context)
                                : `Invalid ${param.name.charAt(0).toUpperCase() + param.name.slice(1)} value.`);
                        }
                        ;
                        context.params.push(r);
                        i++;
                    }
                    ;
                }
                ;
                return typeof this.data.code !== "string"
                    ? await this.data.code(context)
                    : {
                        code: d.util.setCode(data)
                    };
            }
        });
    }
    ;
    get() {
        const { name, params, docs } = this.data;
        return {
            name: name,
            params: (params ? params?.map(x => {
                return {
                    name: x.name,
                    description: x.description,
                    type: x.typename
                        ? x.typename
                        : x.type === typings_1.ParamType.Enum && x.enum
                            ? Object.values(x.enum).map(y => typeof y === 'string' ? `"${y}"` : y).join(' | ') : typings_1.ParamType[x.type],
                    required: x.optional !== undefined ? !x.optional : true,
                    enum: x.type === typings_1.ParamType.Enum && x.enum ? x.enum : undefined
                };
            }) : []),
            usage: `${name}` +
                (params && params.length > 0
                    ? `[${params.map(x => (x.rest ? "..." : "") + x.name + (x.optional ? "?" : "")).join(";")}]`
                    : ""),
            example: docs?.example,
            category: docs?.category,
            src: docs?.src,
            docs: docs?.docs
        };
    }
    ;
    get raw() {
        return this.data;
    }
    ;
}
exports.AoiFunction = AoiFunction;
;
//# sourceMappingURL=function.js.map