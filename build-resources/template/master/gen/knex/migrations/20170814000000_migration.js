/*
<%= constant.warning %>
*/

exports.up = function (knex, Promise) {
    return knex.schema.createTable('AdminUser', function (t) {
        t.increments('id').unsigned().primary();
        t.string('email').notNull();
        t.string('passwordHash');
        t.dateTime('createdAt');
        t.dateTime('updatedAt');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('AdminUser');
};
