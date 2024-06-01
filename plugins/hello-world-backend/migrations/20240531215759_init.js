/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
    await knex.schema.createTable('key_value', table => {
        table.comment('The table of keys and values');

        table.string('key').notNullable().comment('Key of a bucket value');
        table.text('value').notNullable().comment('The value');

        table.primary(['key']);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
    await knex.schema.dropTable('key_value');
};
