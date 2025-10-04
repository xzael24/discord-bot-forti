const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("say")
      .setDescription("Buat bot Forti ngirim pesan multiline atau embed lewat modal input.")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
      .addChannelOption(option =>
        option
          .setName("channel")
          .setDescription("Channel tempat pesan akan dikirim")
          .setRequired(true)
      ),
  
    async execute(interaction) {
      const channel = interaction.options.getChannel("channel");
  
      // Buat modal form
      const modal = new ModalBuilder()
        .setCustomId(`sayModal-${channel.id}`)
        .setTitle("Kirim Pesan lewat Bot Forti");
  
      // Text area input
      const messageInput = new TextInputBuilder()
        .setCustomId("messageInput")
        .setLabel("Isi Pesan (!embed = format embed)")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);
  
      const row = new ActionRowBuilder().addComponents(messageInput);
      modal.addComponents(row);
  
      await interaction.showModal(modal);
    },
  };
  