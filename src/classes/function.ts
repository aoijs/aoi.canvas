import { AoiClient } from 'aoi.js';
import { AoiD } from '..';
import { CanvasUtil } from './util';
import { PermissionsBitField } from 'discord.js';
import { FunctionContext, FunctionData, Param, ParamType } from '../typings';

const Colors: Record<string, string> = {
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
const Permissions: Record<string, any> = {
    createinvite: PermissionsBitField["Flags"].CreateInstantInvite,
    createinstantinvite: PermissionsBitField["Flags"].CreateInstantInvite,
    kickmembers: PermissionsBitField["Flags"].KickMembers,
    banmembers: PermissionsBitField["Flags"].BanMembers,
    administrator: PermissionsBitField["Flags"].Administrator,
    managechannels: PermissionsBitField["Flags"].ManageChannels,
    manageguild: PermissionsBitField["Flags"].ManageGuild,
    addreactions: PermissionsBitField["Flags"].AddReactions,
    viewauditlog: PermissionsBitField["Flags"].ViewAuditLog,
    priorityspeaker: PermissionsBitField["Flags"].PrioritySpeaker,
    stream: PermissionsBitField["Flags"].Stream,
    viewchannel: PermissionsBitField["Flags"].ViewChannel,
    sendmessages: PermissionsBitField["Flags"].SendMessages,
    sendttsmessages: PermissionsBitField["Flags"].SendTTSMessages,
    managemessages: PermissionsBitField["Flags"].ManageMessages,
    embedlinks: PermissionsBitField["Flags"].EmbedLinks,
    attachfiles: PermissionsBitField["Flags"].AttachFiles,
    readmessagehistory: PermissionsBitField["Flags"].ReadMessageHistory,
    mentioneveryone: PermissionsBitField["Flags"].MentionEveryone,
    useexternalemojis: PermissionsBitField["Flags"].UseExternalEmojis,
    viewguildinsights: PermissionsBitField["Flags"].ViewGuildInsights,
    connect: PermissionsBitField["Flags"].Connect,
    speak: PermissionsBitField["Flags"].Speak,
    mute: PermissionsBitField["Flags"].MuteMembers,
    mutemembers: PermissionsBitField["Flags"].MuteMembers,
    deafen: PermissionsBitField["Flags"].DeafenMembers,
    deafenmembers: PermissionsBitField["Flags"].MuteMembers,
    movemembers: PermissionsBitField["Flags"].MoveMembers,
    usevad: PermissionsBitField["Flags"].UseVAD,
    changenickname: PermissionsBitField["Flags"].ChangeNickname,
    managenicknames: PermissionsBitField["Flags"].ManageNicknames,
    manageroles: PermissionsBitField["Flags"].ManageRoles,
    managewebhooks: PermissionsBitField["Flags"].ManageWebhooks,
    manageemojisandstickers: PermissionsBitField["Flags"].ManageEmojisAndStickers,
    manageguildexpressions: PermissionsBitField["Flags"].ManageGuildExpressions,
    requesttospeak: PermissionsBitField["Flags"].RequestToSpeak,
    manageevents: PermissionsBitField["Flags"].ManageEvents,
    managethreads: PermissionsBitField["Flags"].ManageThreads,
    createpublicthreads: PermissionsBitField["Flags"].CreatePublicThreads,
    createprivatethreads: PermissionsBitField["Flags"].CreatePrivateThreads,
    useexternalsticker: PermissionsBitField["Flags"].UseExternalStickers,
    sendmessagesinthreads: PermissionsBitField["Flags"].SendMessagesInThreads,
    useembeddedactivities: PermissionsBitField["Flags"].UseEmbeddedActivities,
    moderatemembers: PermissionsBitField["Flags"].ModerateMembers,
    useapplicationcommands: PermissionsBitField["Flags"].UseApplicationCommands,
    viewcreatormonetizationanalytics: PermissionsBitField["Flags"].ViewCreatorMonetizationAnalytics,
    usesoundboard: PermissionsBitField["Flags"].UseSoundboard,
    useexternalsounds: PermissionsBitField["Flags"].UseExternalSounds,
    sendvoicemessages: PermissionsBitField["Flags"].SendVoiceMessages,
    sendpolls: PermissionsBitField["Flags"].SendPolls,
    all: Object.keys(PermissionsBitField["Flags"])
}
const rgbaRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(\s*,\s*(0|1|0?\.\d+))?\s*\)$/;
const isJSON = (value: string, check?: (value: object) => boolean) => { try {
    const obj = JSON.parse(value);
    return check ? (check(obj) ? obj : null) : obj;
} catch (e) { return null }};

const checkType = async (d: AoiD, param: Param, value: string) => {
    const types = {
        "0": () => value,
        "1": () => !isNaN(parseFloat(value)) ? parseFloat(value) : null,
        "2": () => Number.isInteger(parseFloat(value)) ? parseInt(value) : null,
        "3": () => ["true", "false"].includes(value.toLowerCase()) ? value.toLowerCase() === "true" : null,
        "4": () => {try { new URL(value); return value } catch (e) { return undefined }},
        "5": () => param.enum ? param.enum[value] : undefined,
        "6": () => /^#?([0-9A-Fa-f]{3,4}){1,2}$/.test(value) ? value 
            : (rgbaRegex.test(value) ? (() => {
                const match = value.match(rgbaRegex) as RegExpMatchArray;
                return CanvasUtil.rgbaToHex(
                    parseInt(match[1], 10),
                    parseInt(match[2], 10),
                    parseInt(match[3], 10),
                    match[5] ? parseFloat(match[5]) : undefined
                );
            })() : Colors[value]),
        "7": () => isJSON(value, (obj: object)=> !Array.isArray(obj)),
        "8": () => isJSON(value, (obj: object)=> Array.isArray(obj)),
        "9": () => isJSON(value),
        "10": async () => await d.client.users.fetch(value).catch(() => null),
        "11": async () => await d.client.guilds.fetch(value).catch((e) => null),
        "12": async () => await d.client.channels.fetch(value).catch((e) => null),
        "13": () => Permissions[value],
    };

    return await types[`${param.type}`]();
};

export class AoiFunction<T extends "aoi.js" | "djs"> {
    public data: FunctionData<T>;

    constructor(data: FunctionData<T>) {
        this.data = data;
    };
    
    register(client: AoiClient) {
        client.functionManager.createFunction({
            name: this.data.name,
            type: typeof this.data.code === "string" ? "aoi.js" : "djs",
            params: typeof this.data.code === "string" && this.data.params ? this.data.params.map((param) => param.name) : undefined,
            code: typeof this.data.code === "string" ? this.data.code : async (d: AoiD) => {
                let data = d.util.aoiFunc(d);
                let params: string[] = data.inside.splits.map((x: string) => x?.trim() ?? null);

                let context: FunctionContext = {
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
                                };

                                const r = await checkType(d, param, rvalue);
                                const check = param.check && !await param.check(r, context);

                                if ((r === undefined || r === null) || check)
                                    return d.aoiError.fnError(
                                        d, "custom", {}, 
                                        check && param.checkError 
                                         ? await param.checkError(rvalue, context) 
                                         : `Invalid ${param.name.charAt(0).toUpperCase() + param.name.slice(1)} value.`
                                    );

                                rest.push(r);
                            };

                            context.params.push(rest);
                            break;
                        };

                        if (value === undefined || value === null || value.length === 0) {
                            context.params.push(param?.default ? await param.default(context) : null);
                            i++;
                            continue;
                        };
                        
                        const r = await checkType(d, param, value);
                        const check = param.check && !await param.check(r, context);

                        if ((r === undefined || r === null) || check) {
                            if (param.optional && this.data.params[i + 1]) {
                                const nextparam = this.data.params[i + 1];
                                const nextr = await checkType(d, nextparam, value);
                                const nextcheck = nextparam.check && await nextparam.check(r, context);

                                if ((nextr !== undefined && nextr !== null) || nextcheck) {
                                    context.params.push(
                                        param.default ? await param.default(context) : null,
                                        nextr
                                    );
                                    i += 2;
                                    minus++;
                                    continue;
                                };
                            };

                            return d.aoiError.fnError(
                                d, "custom", {}, 
                                check && param.checkError 
                                 ? await param.checkError(value, context) 
                                 : `Invalid ${param.name.charAt(0).toUpperCase() + param.name.slice(1)} value.`
                            );
                        };
                        
                        context.params.push(r);
                        i++;
                   };
                };

                return typeof this.data.code !== "string" 
                    ? await this.data.code(context) 
                    : {
                        code: d.util.setCode(data)
                    };
            }
        } as any)
    };

    get() {
        const { name, params, docs } = this.data;
    
        return {
            name: name,
            params: (params ? params?.map(x => { return {
                name: x.name,
                description: x.description,
                type: x.typename 
                        ? x.typename 
                        : x.type === ParamType.Enum && x.enum
                            ? Object.values(x.enum).map(y => 
                                typeof y === 'string' ? `"${y}"` : y
                            ).join(' | '): ParamType[x.type],
                required: x.optional !== undefined ? !x.optional : true,
                enum: x.type === ParamType.Enum && x.enum ? x.enum : undefined
            }}) : []),
            usage: `${name}` +
                (params && params.length > 0 
                    ? `[${params.map(x => 
                        (x.rest ? "..." : "") + x.name + (x.optional ? "?" : "")
                    ).join(";")}]` 
                    : ""),
            example: docs?.example,
            category: docs?.category,
            src: docs?.src,
            docs: docs?.docs
        };
    };

    get raw() {
        return this.data;
    };
};