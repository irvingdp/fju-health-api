/*
<%= constant.warning %>
*/

exports.up = function (knex, Promise) {
    return knex.schema.createTable('Device', function (t) {
        t.increments('id').unsigned().primary();
        t.string('token').notNull();
        t.integer('user_id_fk').unsigned().references('id').inTable('User');
        t.dateTime('createdAt');
        t.dateTime('updatedAt');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('Device');
};
