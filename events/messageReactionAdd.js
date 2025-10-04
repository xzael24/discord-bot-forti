const fs = require("fs");
const path = require("path");

module.exports = {
  name: "messageReactionAdd",
  async execute(reaction, user, client) {
    // Skip bot reaction
    if (user.bot) return;

    // Pastikan message/emoji bisa diakses walau partial
    if (reaction.partial) await reaction.fetch();

    const rolesConfig = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../config/roles.json"))
    );

    // Cek apakah reaction dari pesan yang kita pakai
    if (reaction.message.id !== rolesConfig.messageId) return;

    const roleId = rolesConfig.roles[reaction.emoji.name];
    if (!roleId) return;

    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id);

    await member.roles.add(roleId);
    console.log(`✅ ${user.username} dikasih role ${roleId}`);
  },
};
