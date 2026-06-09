const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("user").setDescription("provides info about user"),
    async execute(interaction) {
        await interaction.reply(`this command was run by ${interaction.user.username}, otherwise known as ${interaction.member.displayName} who joined this server on ${interaction.member.joinedAt}.`);
    },
};