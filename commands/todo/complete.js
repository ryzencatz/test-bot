const { SlashCommandBuilder } = require("discord.js");

const {
    loadData,
    saveData,
} = require("../../todo-data/storage");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("complete")
        .setDescription("mark item complete")
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
        )
        .addIntegerOption(option =>
            option
                .setName("index")
                .setDescription("item number")
                .setRequired(true)
        ),

    async execute(interaction) {
        const data = loadData();

        const userId =
            interaction.options.getUser("user").id;

        const cat =
            interaction.options.getString("cat");

        const listName =
            interaction.options.getString("list-name");

        const index =
            interaction.options.getInteger("index") - 1;

        const list =
            data[userId]?.[cat]?.[listName];

        if (!list) {
            await interaction.reply(
                "That list does not exist."
            );
            return;
        }

        if (
            index < 0 ||
            index >= list.length
        ) {
            await interaction.reply(
                "Invalid item number."
            );
            return;
        }

        list[index].completed = true;

        list.sort(
            (a, b) =>
                Number(a.completed) -
                Number(b.completed)
        );

        saveData(data);

        await interaction.reply(
            `Completed item ${index + 1}.`
        );
    },
};