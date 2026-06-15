const { SlashCommandBuilder } = require("discord.js");

const {
    loadData,
} = require("../../todo-data/storage");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("showlist")
        .setDescription("show a todo list")
        .addUserOption(option =>
            option
                .setName("user")
                .setRequired(true)
                .setDescription("user")
        )
        .addStringOption(option =>
            option
                .setName("cat")
                .setRequired(true)
                .setDescription("category")
        )
        .addStringOption(option =>
            option
                .setName("list-name")
                .setRequired(true)
                .setDescription("list name")
        ),

    async execute(interaction) {
        const data = loadData();

        const userId =
            interaction.options.getUser("user").id;

        const cat =
            interaction.options.getString("cat");

        const listName =
            interaction.options.getString("list-name");

        const list =
            data[userId]?.[cat]?.[listName];

        if (!list) {
            await interaction.reply(
                "That list does not exist."
            );
            return;
        }

        let output = `**${listName}**\n\n`;

        list.forEach((item, index) => {
            if (item.completed) {
                output +=
                    `${index + 1}. ~~${item.content}~~\n`;
            } else {
                output +=
                    `${index + 1}. ${item.content}\n`;
            }
        });

        await interaction.reply(output);
    },
};