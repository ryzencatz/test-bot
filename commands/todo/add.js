const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("create")
        .setDescription("creates either a new list or list item")
        .addSubcommand(subcommand => 
            subcommand
                .setName("list")
                .setDescription("creates a new list"))
                .addUserOption()
                    .setName("usr")
                    .setDescription("the user that this list is for")
                    .setRequired()
                .addStringOption()
                    .setName("cat")
                    .setDescription("adds the list to a certain category")
                .addStringOption()
                    .setName("name")
                    .setDescription("adds in the week that the list is for (essentially the lists identifier)")
                    .setRequired(true)
        .addSubcommand(subcommand => 
            subcommand
                .setName("li")
                .setDescription("creates a new list item")
                .addStringOption()
                    .setName("list")
                    .setDescription("the list to add the list item to")
                    .setRequired(true)
                .addStringOption()
                    .setName("content")
                    .setDescription("gets the text for the list item")
                    .setRequired(true)),
    async execute(interaction) {
        await undefined;
    },
};