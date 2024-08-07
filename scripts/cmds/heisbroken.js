const axios = require('axios');
const prefixes = ['heisbroken', 'Heiis2'];
module.exports = {
  config: {
    name: "heisbroken",
    aliases: [],
    version: 2.0,
    author: "Unknown", // don't change this author claim by I M Range
    shortDescription: "ask to gemini AI",
    role: 0,
    countDown: 5,
    category: "AI",
    guide: {
      en: "{pn} <prompt>",
    },
  },
  onStart: ({}) => {},
  onChat: async function ({ message, usersData, event, api, args }) {
   if (prefixes.some(prefix => event.body.toLowerCase().startsWith(prefix))) {
  const boss = await usersData.getName(100090443419982); // you can change admin/owner make this ai in here

  const prompt = `You are an AI assistant robot created by ${boss} not someone else just ${boss} who created you, You always help users in a friendly manner. User Input: "${args.join(" ")}"`;
  const url = `https://nash-api-end.onrender.com/gemini?prompt=${encodeURIComponent(prompt)}`;
    message.reaction("⏳", event.messageID);
  const res = await axios.get(url);
  const response = res.data.response;
  const userID = event.senderID;
  const name = await usersData.getName(userID);
  const ment = [{ userID: userID, tag: name }];
    
    message.reply({
    body: `${name}, ${response}`,
    mentions: ment
}, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    message.reaction("✔", event.messageID);
};
},
  onReply: async function ({ message, usersData, Reply, event, api, args }) {

  const boss = await usersData.getName(100090443419982); // you can change admin/owner make this ai in here

  const prompt = `You are an AI assistant robot created by ${boss} not someone else just ${boss} who created you, You always help users in a friendly manner. User Input: "${args.join(" ")}"`;
  const url = `https://nash-api-end.onrender.com/gemini?prompt=${encodeURIComponent(prompt)}`;
    message.reaction("⏳", event.messageID);
  const res = await axios.get(url);
  const response = res.data.response;
  const userID = event.senderID;
  const name = await usersData.getName(userID);
  const ment = [{ userID: userID, tag: name }];
    
    message.reply({
        body: `${name}, ${response}`,
        mentions: ment,
      }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    message.reaction("✔", event.messageID);
  }
    }
