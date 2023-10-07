// Aoi.js Fork.

let { createCanvas } = require("@napi-rs/canvas");
const Discord = require("discord.js");
const { ButtonStyleOptions } = require("./Constants.js");
const SlashOption = require("./slashOption.js");
const { Time } = require("./TimeParser.js");
const { CreateObjectAST } = require("./functions.js");
const { newError } = require("./canvaError.js");

function mustEscape (msg) {
    return msg
        .split("\\[")
        .join("#RIGHT#")
        .replace(/\\]/g, "#LEFT#")
        .replace(/\\;/g, "#SEMI#")
        .replace(/\\:/g, "#COLON#")
        .replace(/\\$/g, "#CHAR#")
        .replace(/\\>/g, "#RIGHT_CLICK#")
        .replace(/\\</g, "#LEFT_CLICK#")
        .replace(/\\=/g, "#EQUAL#")
        .replace(/\\{/g, "#RIGHT_BRACKET#")
        .replace(/\\}/g, "#LEFT_BRACKET#")
        .replace(/\\,/g, "#COMMA#")
        .replace(/\\&&/g, "#AND#")
        .replaceAll("\\||", "#OR#");
};

const AllParser = async (messg, d, returnMsg = false, channel, client) => {
    let message = {};

    const EmbedParser = async (msg) => {
        msg = mustEscape(msg);
    
        if (!message.embeds) message.embeds = [];
        const embeds = message.embeds;
    
        let msgs = msg.split("{newEmbed:").slice(1);
        for (let rawr of msgs) {
            rawr = rawr.slice(0, rawr.length - 1);
    
            const embed = {};
            embed.fields = [];
            const Checker = (peko) => rawr.includes(`{${peko}:`);
            if (Checker("author")) {
                const auth = rawr.split("{author:")[1].split("}")[0].split(":");
    
                var name = auth.shift().addBrackets()?.trim() || "";
                var icon_url = auth.join(":").addBrackets()?.trim() || "";

                if (icon_url.startsWith("canvas:")) {
                    let parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai = icon_url.split(":");
                    let canvas_name = parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai[1]
                    let canvasname = parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai.slice(2).join(":");
                    if (d.canvases && d.data.canvases[canvasname]) {
                        let canvas_image = await d.data.canvases[canvasname].canvas.encode("png");
                        const attachment = new Discord.AttachmentBuilder(canvas_image, { "name": canvas_name+".png" });
                        if (!message.files) message.files = [];
                        if (!message.files.some(hi => hi.name === canvas_name+".png")) message.files.push(attachment);
                        icon_url = "attachment://"+canvas_name+".png";
                    } else {
                        newError(d, `|Parser| Canvas with name ${canvasname} not found.`);
                    }
                }
    
                embed.author = {
                    name: name,
                    icon_url: icon_url,
                };
            }
            if (Checker("authorURL")) {
                if (!embed.author) return console.error("{author:} was not used");

                let icon_url = rawr.split("{authorURL:")[1]
                    .split("}")[0]
                    .addBrackets()
                    .trim()

                embed.author.url = icon_url;
            }
            if (Checker("title")) {
                embed.title = rawr
                    .split("{title:")[1]
                    .split("}")[0]
                    .addBrackets()
                    .trim();
            }
            if (Checker("url")) {
                if (!embed.title)
                    return console.error(
                        "Title was not provided while using {url}",
                    );
                embed.url = rawr
                    .split("{url:")[1]
                    .split("}")[0]
                    .addBrackets()
                    .trim();
            }
            if (Checker("description")) {
                embed.description = rawr
                    .split("{description:")[1]
                    .split("}")[0]
                    .addBrackets()
                    .trim();
            }
            if (Checker("thumbnail")) {
                let auth = rawr.split("{thumbnail:")[1]
                .split("}")[0].addBrackets().split(":");
                let icon_url = auth.join(":").trim();

                if (icon_url.startsWith("canvas:")) {
                    let parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai = icon_url.split(":");
                    let canvas_name = parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai[1]
                    let canvasname = parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai.slice(2).join(":");
                    if (d.data.canvases && d.data.canvases[canvasname]) {
                        let canvas_image = await d.data.canvases[canvasname].canvas.encode("png");
                        const attachment = new Discord.AttachmentBuilder(canvas_image, { "name": canvas_name+".png" });
                        if (!message.files) message.files = [];
                        if (!message.files.some(hi => hi.name === canvas_name+".png")) message.files.push(attachment);
                        icon_url = "attachment://"+canvas_name+".png";
                    } else {
                        newError(d, `|Parser| Canvas with name ${canvasname} not found.`);
                    }
                }
                embed.thumbnail = {
                    url: icon_url,
                };
            }
            if (Checker("image")) {
                let auth = rawr.split("{image:")[1]
                .split("}")[0].addBrackets().split(":");
                let icon_url = auth.join(":").trim();

                if (icon_url.startsWith("canvas:")) {
                    let parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai = icon_url.split(":");
                    let canvas_name = parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai[1]
                    let canvasname = parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai.slice(2).join(":");
                    if (d.data.canvases && d.data.canvases[canvasname]) {
                        let canvas_image = await d.data.canvases[canvasname].canvas.encode("png");
                        const attachment = new Discord.AttachmentBuilder(canvas_image, { "name": canvas_name+".png" });
                        if (!message.files) message.files = [];
                        if (!message.files.some(hi => hi.name === canvas_name+".png")) message.files.push(attachment);
                        icon_url = "attachment://"+canvas_name+".png";
                    } else {
                        newError(d, `|Parser| Canvas with name ${canvasname} not found.`);
                    }
                }
                embed.image = {
                    url: icon_url,
                };
            }
            if (Checker("footer")) {
                const f = rawr.split("{footer:")[1].split("}")[0].split(":");

                let icon_url = f.join(":").addBrackets().trim() || "";

                if (icon_url.startsWith("canvas:")) {
                    let parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai = icon_url.split(":");
                    let canvas_name = parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai[1]
                    let canvasname = parsed_author_icon_url_canvas_egirl_cat_dog_duck_potato_carrot_skibidi_dop_dop_toilet_emi_is_hot_1_hi_why_you_reading_this_bro_please_dont_say_that_to_emi_ok_i_will_give_you_free_cookies_btw_emi_is_senpai.slice(2).join(":");
                    if (d.data.canvases && d.data.canvases[canvasname]) {
                        let canvas_image = await d.data.canvases[canvasname].canvas.encode("png");
                        const attachment = new Discord.AttachmentBuilder(canvas_image, { "name": canvas_name+".png" });
                        if (!message.files) message.files = [];
                        if (!message.files.some(hi => hi.name === canvas_name+".png")) message.files.push(attachment);
                        icon_url = "attachment://"+canvas_name+".png";
                    } else {
                        newError(d, `|Parser| Canvas with name ${canvasname} not found.`);
                    }
                }

                embed.footer = {
                    text: f.shift().addBrackets().trim() || "",
                    icon_url: f.join(":").addBrackets().trim() || "",
                };
            }
            if (Checker("color")) {
                embed.color = Discord.resolveColor(
                    rawr.split("{color:")[1].split("}")[0].addBrackets().trim(),
                );
            }
            if (rawr.includes("{timestamp")) {
                let t = rawr
                    .split("{timestamp")[1]
                    .split("}")[0]
                    .replace(":", "")
                    .trim();
                if (t === "" || t === "ms") {
                    t = Date.now();
                }
                embed.timestamp = new Date(t);
            }
            if (Checker("field")) {
                const fi = rawr.split("{field:").slice(1);
                for (let fo of fi) {
                    fo = fo.split("}")[0].split(":");
                    const fon = fo.shift().addBrackets().trim();
                    const foi = ["yes", "no", "true", "false"].find(
                        (x) => x === fo[Number(fo.length - 1)].trim(),
                    )
                        ? fo.pop().trim() === "true"
                        : false;
    
                    const fov = fo.join(":").addBrackets().trim();
                    embed.fields.push({ name: fon, value: fov, inline: foi });
                }
            }
            if (Checker("fields")) {
                const fie = rawr.split("{fields:").slice(1);
                for (let fiel of fie) {
                    fiel = fiel.split("}")[0].split(":");
                    for (let oof of fiel) {
                        oof = oof.split(",");
                        const oofn = oof.shift().addBrackets().trim();
                        const oofi = ["yes", "no", "true", "false"].find(
                            (x) => x === oof[oof.length - 1].trim(),
                        )
                            ? oof.pop().trim() === "true"
                            : false;
                        const oofv = oof.join(",").addBrackets().trim();
                        embed.fields.push({
                            name: oofn,
                            value: oofv,
                            inline: oofi,
                        });
                    }
                }
            }
            embeds.push(embed);
        }
    };
    const ComponentParser = async (msg) => {
        msg = mustEscape(msg);
        let msgs = msg.split("{actionRow:").slice(1);
        if (!message.components) message.components = [];
        const actionRows = message.components;
        for (let nya of msgs) {
            const index = nya.lastIndexOf("}");
            nya = nya.slice(0, index);
    
            const buttonPart = [];
            const Checker = (neko) => nya.includes("{" + neko + ":");
            if (Checker("button")) {
                const inside = nya.split("{button:").slice(1);
                for (let button of inside) {
                    button = button?.split("}")[0];
                    button = button?.split(":").map((x) => x.trim());
    
                    const label = button.shift().addBrackets();
                    const btype = 2;
                    let style = isNaN(button[0])
                        ? button.shift()
                        : Number(button.shift());
                    style = ButtonStyleOptions[style] || style;
                    const cus = button.shift().addBrackets();
                    const disable =
                        button
                            .shift()
                            ?.replace("yes", true)
                            ?.replace("no", false)
                            ?.replace("true", true)
                            ?.replace("false", false) || false;
                    const emoji = button.length
                        ? (button || []).join(":").trim().startsWith("<")
                            ? client.emojis.cache.find(
                                  (x) => x.toString() === button.join(":"),
                              )
                            : {
                                  name: button.join(":").split(",")[0],
                                  id: button.join(":").split(",")[1] || 0,
                                  animated: button.join(":").split(",")[2] || false,
                              }
                        : undefined;
                    const d =
                        Number(style) === 5
                            ? {
                                  label: label,
                                  type: btype,
                                  style: style,
                                  url: cus,
                                  disabled: disable,
                              }
                            : {
                                  label: label,
                                  type: btype,
                                  style: style,
                                  custom_id: cus,
                                  disabled: disable,
                              };
                    if (emoji) {
                        const en = emoji?.name;
                        const eid = emoji?.id;
                        const ea = emoji?.animated;
                        d.emoji = { name: en, id: eid, animated: ea };
                    }
                    buttonPart.push(d);
                }
            }
            if (Checker("selectMenu")) {
                let inside = nya.split("{selectMenu:").slice(1).join("");
                inside = inside.split(":").map((c) => c.trim());
                const customID = inside.shift();
                const placeholder = inside.shift();
                const minVal = inside[0] === "" ? 0 : Number(inside.shift());
                const maxVal = inside[0] === "" ? 1 : Number(inside.shift());
                const disabled = inside.shift() === "true";
                const options = inside.join(":").trim();
    
                let optArray = [];
                if (options.includes("{selectMenuOptions:")) {
                    const opts = options.split("{selectMenuOptions:").slice(1);
    
                    for (let opt of opts) {
                        opt = opt.split("}")[0].split(":");
                        const label = opt.shift();
                        const value = opt.shift();
                        const desc = opt.shift();
                        const def = opt.shift() === "true";
                        const emoji = opt.length
                            ? (opt || "").join(":").trim().startsWith("<")
                                ? client.emojis.cache.find(
                                      (x) => x.toString() === opt.join(":"),
                                  )
                                : {
                                      name: opt.join(":").split(",")[0].trim(),
                                      id: opt.join(":").split(",")[1]?.trim() || 0,
                                      animated:
                                          opt.join(":").split(",")[2]?.trim() ||
                                          false,
                                  }
                            : undefined;
                        const ind = {
                            label: label,
                            value: value,
                            description: desc,
                            default: def,
                        };
                        if (emoji) {
                            const en = emoji?.name;
                            const eid = emoji?.id;
                            const ea = emoji?.animated;
                            ind.emoji = { name: en, id: eid, animated: ea };
                        }
    
                        optArray.push(ind);
                    }
                }
                buttonPart.push({
                    type: 3,
                    custom_id: customID,
                    placeholder: placeholder,
                    min_values: minVal,
                    max_values: maxVal,
                    disabled,
                    options: optArray,
                });
            }
            if (Checker("textInput")) {
                let inside = nya.split("{textInput:").slice(1);
                for (let textInput of inside) {
                    textInput = textInput.split("}")[0].split(":");
                    const label = textInput.shift().addBrackets().trim();
                    let style = textInput.shift().addBrackets().trim();
                    style = isNaN(style) ? style : Number(style);
                    const custom_id = textInput.shift().addBrackets().trim();
                    const required =
                        textInput.shift()?.addBrackets().trim() === "true";
                    const placeholder = textInput.shift()?.addBrackets().trim();
                    const min_length = textInput.shift()?.addBrackets().trim();
                    const max_length = textInput.shift()?.addBrackets().trim();
                    const value = textInput.shift()?.addBrackets().trim();
                    // console.log({
                    //   type: 4,
                    //   label,
                    //   style,
                    //   custom_id,
                    //   required,
                    //   placeholder,
                    //   min_length,
                    //   max_length,
                    //   value,
                    // });
                    buttonPart.push({
                        type: 4,
                        label,
                        style,
                        custom_id,
                        required,
                        placeholder,
                        min_length,
                        max_length,
                        value,
                    });
                }
            }
            actionRows.push({ type: 1, components: buttonPart });
        }
    };
    const EditParser = async (msg) => {
        msg = msg.split("{edit:").slice(1).join("").split("}");
        msg.pop();
        msg = msg.join("}");
        const time = msg.split(":")[0].trim();
        msg = msg.split(":").slice(1).join(":").trim();
        const msgs = CreateObjectAST(msg);
        const ans = {
            time,
            messages: [],
        };
        for (let p of msgs) {
            p = p.slice(1, -1);
            const pps = CreateObjectAST(p);
            const mmsg = {
                content: " ",
                embeds: [],
                components: [],
                files: [],
            };
            for (const pp of pps) {
                p = p.replace(pp, "");
                if (Checker("newEmbed")) mmsg.embeds.push(...await EmbedParser(part));
                else if (Checker("actionRow"))
                    mmsg.components.push(...await ComponentParser(part));
                else if (Checker("attachment") || Checker("file"))
                    mmsg.files.push(...FileParser(part));
            }
            mmsg.content = p.trim() === "" ? " " : p.trim();
            ans.messages.push(mmsg);
        }
        return ans;
    };
    const FileParser = (msg) => {
        if (!msg) return;
        msg = mustEscape(msg);
        const Checker = (ayaya) => msg.includes("{" + ayaya + ":");
        if(!message.files) message.files = [];
        const att = message.files;
        if (Checker("attachment")) {
            const e = msg
                ?.split("{attachment:")
                ?.slice(1)
                .map((x) => x.trim());
            for (let o of e) {
                o = o.split("}")[0];
                o = o.split(":");
                const name = o.pop().addBrackets();
                const url = o.join(":").addBrackets();
                const attachment = new Discord.AttachmentBuilder(url, name);
                att.push(attachment);
            }
        }
        if (Checker("file")) {
            const i = msg
                .split("{file:")
                ?.slice(1)
                .map((x) => x.trim());
            for (let u of i) {
                u = u.split("}")[0];
                u = u.split(":");
                const name = u.pop().addBrackets();
                const text = u.join(":").addBrackets();
                const attachment = new Discord.AttachmentBuilder(
                    Buffer.from(text),
                    name || "txt.txt",
                );
                att.push(attachment);
            }
        }
    };
    const OptionParser = async (options, d) => {
        const Checker = (msg) => options.includes(msg);
        const optionData = {};
        if (Checker("{edit:")) {
            const editPart = options.split("{edit:")[1].split("}}")[0];
            const dur = editPart.split(":")[0];
            const msgs = editPart.split(":{").slice(1).join(":{").split("}:{");
            const messages = [];
            for (const msg of msgs) {
                messages.push(await errorHandler(msg.split("}:{")[0], d));
            }
            optionData.edits = { time: dur, messages };
        }
        if (Checker("{reactions:")) {
            const react = options.split("{reactions:")[1].split("}")[0];
            optionData.reactions = react.split(",").map((x) => x.trim());
        }
        if (Checker("{delete:")) {
            optionData.deleteIn = Time.parse(
                options.split("{delete:")[1].split("}")[0].trim(),
            )?.ms;
        }
        if (Checker("deletecommand")) {
            optionData.deleteCommand = true;
        }
        if (Checker("interaction")) {
            optionData.interaction = true;
        }
        return optionData;
    };

    let errorMessage = messg;
    errorMessage = errorMessage.trim();
    let send = true;
    let deleteCommand = false;
    let interaction;
    let deleteAfter;
    const Checker = (parts,ayaya) => parts.includes("{" + ayaya + ":");
    let suppress = false;
    let reactions = [];

    let edits = {
        time: "0s",
        messages: [],
    };
  const parts = CreateObjectAST( errorMessage );
  for ( const part of parts )
  {
      errorMessage = errorMessage.replace( part, "" );
        if (Checker(part,"newEmbed")) await EmbedParser(part);
        else if (Checker(part, "actionRow"))
            await ComponentParser(part);
        else if (Checker(part, "attachment") || Checker("file"))
            FileParser(part);
        else if (Checker(part, "edit")) edits = await EditParser(part);
        else if (Checker(part, "suppress")) suppress = true;
        else if (Checker(part,"deleteCommand")) deleteCommand = true;
        else if (Checker(part, "interaction")) interaction = true;
        else if (Checker(part, "deleteAfter"))
            deleteAfter = part.split(":")[1].trim();
        else if (Checker(part, "reactions"))
            reactions = part
                .split(":")[1]
                .trim().split("}")[0]
                .split(",")
                .map((x) => x.trim());
    }

    let embeds = message.embeds || [];
    let components = message.components || [];
    let files = message.files || [];

    if (!embeds.length) send = false;

    if (send && suppress) send = false;

    if (returnMsg === true) {
        return {
          embeds: send ? embeds : [],
          components: components,
            content:
                errorMessage.addBrackets() === ""
                    ? " "
                    : errorMessage.addBrackets(),
            files,
            options: {
                reactions: reactions.length ? reactions : undefined,
                suppress,
                edits,
                deleteIn: deleteAfter,
                deleteCommand,
            },
        };
    }

    errorMessage = errorMessage.addBrackets().trim();
    if (!(errorMessage.length || send || files.length)) return;

    const ch = channel || d.channel;

    if (
        (errorMessage.length || send || files.length) &&
        d &&
        ch &&
        !returnMsg
    ) {
        const m = await ch
            .send({
                content: errorMessage.addBrackets(),
                embeds: send ? embeds : [],
                files: files?.length ? files : [],
            })
            .catch(() => {});

        if (!m) return;

        if (m && reactions.length) {
            for (const reaction of reactions) {
                await m.react(reaction).catch(console.error);
            }
        }

        if (m && edits.timeout) {
            for (const code of edits.messages) {
                await new Promise((e) => setTimeout(e, edits.timeout));

                const sender = await errorHandler(d, code, true);

                await m.suppressEmbeds(suppress);

                await m.edit(sender.message, sender.embed).catch(() => null);
            }
        }

        if (m && deleteAfter) {
            m.delete({
                timeout: deleteAfter,
            }).catch(() => null);
        }

        if (returnMsg === "id") {
            return m.id;
        } else if (returnMsg === "object") {
            return m;
        } else if (returnMsg === "withMessage") return m;
    }
};

module.exports = {
    catParser: async function (cat) {
        let obj = [];

        for (var kitty of cat.split("{")) {
            let object = { };

            var inside = kitty.split("}")[0]
            var [ name, ...params ] = inside.split(":")

            object.name = name || "undefined"
            object.params = params || []

            obj.push(object)
        }

        return obj;
    },
    AllParser
};