const fs = require("fs");
const path = require("path");

module.exports = {
  name: "messageReactionRemove",
  async execute(reaction, user, client) {
    if (user.bot) return;
    if (reaction.partial) await reaction.fetch();

    const rolesConfig = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../config/roles.json"))
    );

    if (reaction.message.id !== rolesConfig.messageId) return;

    const roleId = rolesConfig.roles[reaction.emoji.name];
    if (!roleId) return;

    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id);

    await member.roles.remove(roleId);
    console.log(`❌ ${user.username} dicabut role ${roleId}`);
  },
};
