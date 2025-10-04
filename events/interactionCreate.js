const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    // Biarkan command handler utama tetap jalan
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      try {
        await command.execute(interaction);
      } catch (err) {
        console.error(err);
        await interaction.reply({
          content: "❌ Terjadi kesalahan saat menjalankan command.",
          ephemeral: true,
        });
      }
      return;
    }

    // 🎯 Handler untuk modal /say
    if (interaction.isModalSubmit() && interaction.customId.startsWith("sayModal-")) {
      const channelId = interaction.customId.split("-")[1];
      const channel = await client.channels.fetch(channelId);
      const message = interaction.fields.getTextInputValue("messageInput");

      if (!channel.isTextBased()) {
        return interaction.reply({
          content: "❌ Channel itu bukan text channel!",
          ephemeral: true,
        });
      }

      // Mode EMBED
      if (message.startsWith("!embed")) {
        const content = message.replace("!embed", "").trim();

        const embed = new EmbedBuilder()
          .setColor("#2b2d31")
          .setTitle("📢 Pengumuman Forti")
          .setDescription(content)
          .setFooter({
            text: "Forti Study Club",
            iconURL: client.user.displayAvatarURL(),
          })
          .setTimestamp();

        await channel.send({ embeds: [embed] });
        return interaction.reply({
          content: `✅ Pesan embed dikirim ke ${channel}`,
          ephemeral: true,
        });
      }

      // Mode teks biasa
      await channel.send(message);
      await interaction.reply({
        content: `✅ Pesan teks dikirim ke ${channel}`,
        ephemeral: true,
      });
    }
  },
};
